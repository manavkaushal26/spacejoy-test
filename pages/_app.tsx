import CommonSEO from '@components/Shared/SEO/DefaultSeo';
import { Provider as OfferProvider, useCreateStore as OfferStore } from '@lib/offerStore';
import { Provider, useCreateStore } from '@lib/store';
import AuthProvider from '@store/AuthProvider';
import FirebaseContextProvider from '@store/FirebaseContextProvider';
import ShopFilterContextProvider from '@store/ShopFilterContext';
import { trackUtmClick } from '@utils/affiseAffiliateTracking';
import { initAnalytics, LandingPage, PwaInstalled, RouteChange } from '@utils/analyticsLogger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pageview } from 'react-ga';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';
// import { pageview } from '@lib/ga';

declare global {
  interface Window {
    GA_INITIALIZED: any;
  }
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }): React.ReactElement => {
  const createStore = useCreateStore(pageProps.initialZustandState || {});
  const createOfferStore = OfferStore(pageProps.initialZustandState || {});
  const [loading, setLoading] = useState(false);

  const getUtmParam = (url) => url.split('utm_')[1];

  // const routeChangeHandler = () => {
  //   window.scrollTo(0, 0);
  //   RouteChange({ route: window.location.pathname, utm_source: getUtmParam(window.location.href) });
  // };

  // const appInstalled = (evt) => {
  //   PwaInstalled({ evt });
  // };

  const router = useRouter();

  useEffect(() => {
    // Should only be run once on landing
    if (!window.GA_INITIALIZED) {
      initAnalytics();
      window.GA_INITIALIZED = true;
    }
    LandingPage({ route: window?.location?.pathname, utm_source: getUtmParam(window?.location?.href) });

    router.events.on('routeChangeStart', (url) => {
      if (url.split('/')[1] !== 'playstore') {
        setLoading(true);
      }
    });
    router.events.on('routeChangeComplete', () => {
      setLoading(false);
      window.scrollTo(0, 0);
      RouteChange({ route: window?.location?.pathname, utm_source: getUtmParam(window?.location?.href) });
    });
    window.addEventListener('appinstalled', (evt) => {
      PwaInstalled({ evt });
    });
  }, []);

  useEffect(() => {
    if (router?.query?.clickid) trackUtmClick({ clickId: router?.query?.clickid });
  }, [router.query]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <FirebaseContextProvider>
        <AuthProvider>
          {/* <SessionProvider session={session}> */}
          <Provider createStore={createStore}>
            <OfferProvider createStore={createOfferStore}>
              <CommonSEO />
              <ThemeProvider theme={{}}>
                <ShopFilterContextProvider>
                  <Component {...pageProps} />
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      className: 'shadow-lg',
                    }}
                  />
                </ShopFilterContextProvider>
              </ThemeProvider>
            </OfferProvider>
          </Provider>
          {/* </SessionProvider> */}
        </AuthProvider>
      </FirebaseContextProvider>
    </>
  );
};

export default MyApp;
