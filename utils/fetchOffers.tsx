import fetcher from './fetcher';

const getCouponsList = async (cb) => {
  const response = await fetcher({
    endPoint: '/coupon/listings?type=product',
    method: 'GET',
  });
  if (response.statusCode <= 300) {
    cb(response.data);
  }
};

const fetchBrandOffers = async (cb, productId) => {
  const res = await fetcher({
    endPoint: '/v1/offers/listing',
    method: 'GET',
  });
  if (res.statusCode <= 300) {
    const { data } = res;
    let tempArr = data?.data?.filter(function (data) {
      return data?.retailer?._id === productId;
    });

    cb(tempArr);
  }
};

export { getCouponsList, fetchBrandOffers };
