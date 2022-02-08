import fetcher from '@utils/fetcher';
import { useEffect, useReducer, useState } from 'react';

const initialState = {
  product: {
    coupons: [],
  },
  retailer: {
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
      return '/v1/offers/listing';
  }
};

const fetchCoupons = async (couponType) => {
  const { data, statusCode } = await fetcher({ endPoint: getEndPoint(couponType), method: 'GET' });
  if (statusCode < 300) {
    return data;
  } else {
    return [];
  }
};

const useCoupons = (type) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.product?.coupons?.length) {
      setLoading(true);
      (async () => {
        const productCoupons = await fetchCoupons('product');
        dispatch({ type: 'SAVE_COUPONS', payload: { data: productCoupons, type: 'product' } });
        setLoading(false);
      })();
    }
    if (!state?.product?.retailer?.length) {
      setLoading(true);
      (async () => {
        const brandCouponRes = await fetchCoupons('retailer');
        dispatch({ type: 'SAVE_COUPONS', payload: { data: brandCouponRes?.data, type: 'retailer' } });
        setLoading(false);
      })();
    }
  }, []);

  return {
    coupons: type ? state[type] : state,
    loading,
  };
};

export default useCoupons;
