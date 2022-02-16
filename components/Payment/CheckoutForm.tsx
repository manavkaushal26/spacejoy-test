// import Button from '@components/Button';
import SVGLoader from '@components/Shared/SVGLoader';
import { useStore } from '@lib/store';
import { PushEvent } from '@utils/analyticsLogger';
// import Alert from '@sections/Checkout/Alert';
// import themeConst from '@theme/index';
import fetcher from '@utils/fetcher';
// import { reactLocalStorage } from '@utils/helper';
// import { saveUtmClick } from '@utils/utmAnalytics';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import shallow from 'zustand/shallow';

declare global {
  interface Window {
    ir: any;
  }
}
const designCheckout = '/order/checkout/payment';

const storeCheckout = '/v1/orders/store/checkout';

const customPackageCheckout = '/v1/subscriptionOrders/checkout';

const partCheckout = (orderId) => `/v1/payments/${orderId}/checkout`;

const style = {
  base: {
    iconColor: '#2F3640',
    color: '#2F3640',
    fontSize: '14px',
    letterSpacing: '0.025em',
    fontWeight: 'normal',
    fontFamily: 'Open Sans, Segoe UI, sans-serif',
    fontSmoothing: 'antialiased',
    padding: '16px',
    '::placeholder': {
      color: '#535E6F',
    },
  },
  invalid: {
    iconColor: '#fa4a5b',
    color: '#fa4a5b',
  },
};

const getEndPoint = (checkoutFlow, orderId) => {
  switch (checkoutFlow) {
    case 'store':
      return storeCheckout;
    case 'design':
      return designCheckout;
    case 'payment':
      return partCheckout(orderId);
    case 'customPackage':
      return customPackageCheckout;
    default:
      return designCheckout;
  }
};

function CheckoutForm({
  stripe,
  plan,
  hideCardCapture,
  coupon,
  paymentStatus,
  pid,
  authVerification,
  cb,
  checkoutFlow,
  data,
  orderId,
  commentCouponCode,
  totalAmount,
}) {
  const { cart: cartData, updateCart: setCartData } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
    }),
    shallow
  );

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [pageError, setPageError] = useState('');
  useEffect(() => setPageError(''), [plan, coupon]);

  const ir = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.ir) {
        ir.current = window.ir;
      }
    }
  }, [typeof window]);

  const handlePay = async (token) => {
    setSubmitInProgress(true);
    const body = {
      store: {
        token: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? token : 'tok_br',
        data: {
          comments: [
            {
              type: 'Order',
              message: data,
            },
            {
              type: 'OrderCustomerCoupon',
              message: commentCouponCode,
            },
          ],
        },
      },
      payment: {
        token: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? token : 'tok_br',
      },
      customPackage: {
        token: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? token : 'tok_br',
        data: {
          type: 'stripe',
        },
      },
      design: {
        data: {
          projectId: pid,
          token: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? token : 'tok_br',
          packageName: plan,
          couponCode: coupon.code,
          isGiftCard: coupon.isGiftCard,
        },
      },
    };

    const response = await fetcher({
      endPoint: getEndPoint(checkoutFlow, orderId),
      method: (paymentStatus === 'fail' || paymentError) && checkoutFlow === 'design' ? 'PUT' : 'POST',
      body: body[checkoutFlow],
    });

    if (response.statusCode <= 300) {
      setSubmitInProgress(false);
      cb(true);
      if (checkoutFlow === 'store') {
        setCartData({
          cartItems: {},
          count: 0,
          invoiceData: {},
        });
      } else {
        ir?.current?.('track', {
          orderID: response.data.order, // Email ID of Friend / Registration ID
          event: 'sale',
          fname: authVerification?.name, // Friend Name
          email: authVerification?.email, // Friend Email
          order_custom_val: plan,
        });
      }
      PushEvent({
        category: checkoutFlow === 'store' ? 'Store Checkout' : 'Checkout',
        action: `Place ${token ? 'Paid' : 'Free'} Order For - ${
          checkoutFlow === 'store' ? cartData?.invoiceData?.total : plan
        }`,
        label: 'Place your order',
      });

      if (checkoutFlow !== 'payment') {
        const { data: { order = '' } = {} } = response;
        const orderTotal = checkoutFlow === 'store' ? cartData?.invoiceData?.total : totalAmount;
      }
    } else {
      setSubmitInProgress(false);
      cb(false);
      PushEvent({
        category: checkoutFlow === 'store' ? 'Store Checkout' : 'Checkout',
        action: `Failed Paid Order For - ${checkoutFlow === 'store' ? cartData?.invoiceData?.total : plan}`,
        label: `Place your order | message: ${response.message}`,
      });
      setPaymentError(checkoutFlow === 'store' ? response.data.message : response.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitInProgress(true);

    if (stripe) {
      stripe.createToken({ name: authVerification.name }).then(({ error, token }) => {
        if (error) {
          setPageError(error.message);
          setSubmitInProgress(false);

          return;
        }
        handlePay(token.id);
      });
    } else {
      setSubmitInProgress(false);
      // eslint-disable-next-line no-console
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  const randomToken = useMemo(() => {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);
  }, []);

  return (
    <div>
      {(pageError || paymentError) && <div className="mb-2 text-sm text-red-500">{paymentError || pageError}</div>}
      {hideCardCapture ? (
        <>
          <div>No Credit Card Required</div>
          <button
            className="w-full px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            onClick={() => handlePay(checkoutFlow === 'store' ? randomToken : null)}
          >
            {submitInProgress ? <SVGLoader /> : <>Place your order</>}
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement style={style} />
          <br />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 w-52"
            onClick={() => {
              PushEvent({
                category: checkoutFlow === 'store' ? 'Store Checkout' : 'Checkout',
                action: `Attempt to Order ${plan ? ' - ' + plan : ''}`,
                label: 'Attempt to Place your order',
              });
            }}
          >
            {submitInProgress ? (
              <SVGLoader />
            ) : (
              <>{paymentStatus === 'fail' || paymentError ? 'Please Retry' : 'Place your order'}</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

CheckoutForm.defaultProps = {
  paymentStatus: '',
  plan: '',
  hideCardCapture: false,
  coupon: {
    code: '',
    isGiftCard: false,
  },
  stripe: {},
  pid: '',
  orderId: '',
  checkoutFlow: 'design',
  data: '',
  commentCouponCode: '',
  authVerification: {
    name: '',
    email: '',
  },
  cb: () => {},
  totalAmount: 0,
};

CheckoutForm.propTypes = {
  plan: PropTypes.string,
  hideCardCapture: PropTypes.bool,
  paymentStatus: PropTypes.string,
  coupon: PropTypes.shape({
    amount: PropTypes.number,
    isPercent: PropTypes.bool,
    code: PropTypes.string,
    isGiftCard: PropTypes.bool,
  }),
  pid: PropTypes.string,
  orderId: PropTypes.string,
  stripe: PropTypes.shape({
    createToken: PropTypes.func,
  }),
  checkoutFlow: PropTypes.string,
  data: PropTypes.string,
  commentCouponCode: PropTypes.string,
  authVerification: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  cb: PropTypes.func,
  totalAmount: PropTypes.number,
};

export default injectStripe(CheckoutForm);
