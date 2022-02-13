import { useStore } from '@lib/offerStore';
import fetcher from '@utils/fetcher';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

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
  const { offers, setProductOffers, setBrandOffers } = useStore(
    (store) => ({
      offers: store.offers,
      setProductOffers: store.setProductOffers,
      setBrandOffers: store.setBrandOffers,
    }),
    shallow
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!offers?.product?.coupons?.length) {
      setLoading(true);
      (async () => {
        const productCoupons = await fetchCoupons('product');
        setProductOffers(productCoupons);
        setLoading(false);
      })();
    }
    if (!offers?.product?.retailer?.length) {
      setLoading(true);
      (async () => {
        const brandCouponRes = await fetchCoupons('retailer');
        setBrandOffers(brandCouponRes?.data);

        setLoading(false);
      })();
    }
  }, []);

  return {
    coupons: type ? offers[type] : offers,
    loading,
  };
};

export default useCoupons;
