import useLocalStorage from '@utils/hooks/useLocalStorage';
import Cookie from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
const AuthContext = React.createContext({
  session: {
    user: { name: '', email: '', id: '' },
    token: '',
  },
  loading: true,
  logout: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [session, setSession] = useLocalStorage('session', {});

  const [loading, setLoading] = useState(!session);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const user = await fetch('https://auth.spacejoy.com/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    }).then((data) => {
      return data.json();
    });
    if (user?.token) Cookie.set('token', user.token);
    setSession(user);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // listen to crossDocument message from an iframe
    //listen to message event
    const handleMessage = (event) => {
      if (event.origin === 'https://auth.spacejoy.com') {
        if (event.data.type === 'SIGN_IN_SUCCESS') {
          fetchUser();
        }
      }
    };
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const logout = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const csrfToken = await fetch('https://auth.spacejoy.com/api/auth/csrf', {
      method: 'GET',
      credentials: 'include',
    }).then((data) => data.json());
    const response = await fetch('https://auth.spacejoy.com/api/auth/signout', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: new URLSearchParams({ ...csrfToken, json: true }),
    });
    if (response.ok) {
      setSession({});
    }
  };

  return <AuthContext.Provider value={{ session, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useSession = () => {
  return React.useContext(AuthContext);
};

export default AuthProvider;
