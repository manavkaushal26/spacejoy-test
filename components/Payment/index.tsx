import CheckoutForm from '@components/Payment/CheckoutForm';
import LoadScript from '@utils/LoadScript';
import React, { useEffect, useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

const src = 'https://js.stripe.com/v3/';

const Index = (props) => {
  const [stripeReady, setStripeReady] = useState(false);
  useEffect(() => {
    LoadScript({ src, id: 'stripe-js', callback: () => setStripeReady(true) });
  }, []);

  return (
    <>
      {stripeReady ? (
        <StripeProvider apiKey={process.env.NEXT_PUBLIC_STRIPE_KEY}>
          <Elements>
            <CheckoutForm {...props} />
          </Elements>
        </StripeProvider>
      ) : (
        <div className="text-center">
          <span className="icon-loader loading-spinner" />
        </div>
      )}
    </>
  );
};

export default Index;
