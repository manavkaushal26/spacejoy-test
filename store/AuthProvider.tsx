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
    console.log('wut');
    setLoading(true);
    const user = await fetch('https://auth.spacejoy.com/api/auth/session', { method: 'GET' }).then((data) => {
      console.log(data);

      return data.json();
    });
    console.log('here', user);

    Cookie.set('token', user.token);
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
        console.log(`event`, event);
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
    const csrfToken = await fetch('https://auth.spacejoy.com/api/auth/csrf', { method: 'GET' }).then((data) =>
      data.json()
    );
    const response = await fetch('https://auth.spacejoy.com/api/auth/logout', {
      method: 'POST',
      headers,
      body: JSON.stringify(csrfToken),
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
