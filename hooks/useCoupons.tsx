import fetcher from '@utils/fetcher';
import { useEffect, useReducer, useState } from 'react';

const initialState = {
  product: {
    coupons: [],
  },
};

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'SAVE_COUPONS': {
      const {
        payload: { data, type: couponType },
      } = action;

      return {
        ...state,
        [couponType]: {
          coupons: data,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getEndPoint = (couponType) => {
  switch (couponType) {
    case 'product':
      return '/coupon/listings?type=product';
    default:
      return '/coupon/listings';
  }
};

const useCoupons = (type) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state[type]?.coupons?.length && type) {
      try {
        setLoading(true);
        (async () => {
          const couponRes = await fetcher({ endPoint: getEndPoint(type), method: 'GET' });
          const { data, statusCode } = couponRes;

          if (statusCode < 301) {
            dispatch({ type: 'SAVE_COUPONS', payload: { data, type } });
          }
        })();
      } catch {
      } finally {
        setLoading(false);
      }
    }
  }, [type]);

  return {
    coupons: state[type]?.coupons,
    loading,
  };
};

export default useCoupons;
