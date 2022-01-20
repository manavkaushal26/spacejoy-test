import CommonSEO from '@components/Shared/SEO/DefaultSeo';
import { Provider, useCreateStore } from '@lib/store';
import ShopFilterContextProvider from '@store/ShopFilterContext';
import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const createStore = useCreateStore(pageProps.initialZustandState || {});

  return (
    <>
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
    </>
  );
};

export default MyApp;
