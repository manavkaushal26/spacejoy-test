import CommonSEO from '@components/Shared/SEO/DefaultSeo';
import { Provider, useCreateStore } from '@lib/store';
import AuthProvider from '@store/AuthProvider';
import ShopFilterContextProvider from '@store/ShopFilterContext';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }): React.ReactElement => {
  const createStore = useCreateStore(pageProps.initialZustandState || {});
  console.log('session', session);

  return (
    <>
      <AuthProvider>
        <SessionProvider session={session}>
          <Provider createStore={createStore}>
            <CommonSEO />
            <ThemeProvider theme={{}}>
              <ShopFilterContextProvider>
                <Component {...pageProps} />
                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    className: 'shadow-lg',
                  }}
                />
              </ShopFilterContextProvider>
            </ThemeProvider>
          </Provider>
        </SessionProvider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
