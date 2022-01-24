import useLocalStorage from '@utils/hooks/useLocalStorage';
import Cookie from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
    const user = await fetch('https://auth.spacejoy.com/api/auth/session', { method: 'GET' }).then((data) =>
      data.json()
    );

    Cookie.set('token', user.token);
    setSession(user);
    setLoading(false);
  }, [setSession, setLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // listen to crossDocument message from an iframe
    //listen to message event
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin === 'https://auth.spacejoy.com') {
          if (event.data.type === 'SIGNIN_SUCCESS') {
            fetchUser();
          } else {
            toast.error("We couldn't sign you in. Please try again.");
          }
        } else {
          toast.error(`${event.origin} is not allowed to post messages to this domain.`);
        }
      },
      false
    );
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
