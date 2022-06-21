import PricingModal from '@components/Shared/PricingModal';
import SVGLoader from '@components/Shared/SVGLoader';
import { TagIcon, XCircleIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import { bgImages } from '@utils/Mocks/topCollages';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Index = ({ data, pricingData }) => {
  const [couponText, setCouponText] = useState('');
  const [couponLoader, setCouponLoader] = useState(false);

  const [availableCoupons, setAvailableCoupons] = useState([]);

  // fetch coupons
  useEffect(() => {
    (async () => {
      setCouponLoader(true);
      try {
        const { statusCode, data } = await fetcher({ endPoint: '/v1/subscriptionCartCoupons', method: 'GET' });
        if (statusCode <= 301) {
          setAvailableCoupons(data);
        } else {
          throw new Error();
        }
      } catch {
      } finally {
        setCouponLoader(false);
      }
    })();
  }, []);

  const [cart, setCart] = useState({
    loading: false,
    cartItems: [],
    invoiceData: { discount: { coupons: [], total: 0 }, total: 0 },
  });

  const removeCoupon = async (couponId) => {
    setCouponLoader(true);
    const endPoint = `/v1/subscriptionCartCoupons/${couponId}`;
    const { data, statusCode } = await fetcher({ endPoint, method: 'DELETE' });
    if (statusCode < 301) {
      setCart(data);
    } else {
      toast.error('Error while removing coupon');
    }
    setCouponLoader(false);
  };

  React.useEffect(() => {
    if (data) setCart(data);
  }, [data]);
  const { cartItems = [], invoiceData: { total: finalTotal = 0, discount } = {}, loading = false } = cart;

  const applyCoupon = async (couponCode) => {
    setCart({ ...cart, loading: true });
    const endPoint = '/v1/subscriptionCartCoupons';
    const payload = {
      coupon: couponCode,
      isGiftCard: false,
    };
    try {
      const { data, statusCode } = await fetcher({ endPoint, method: 'POST', body: payload });
      if (statusCode < 301) {
        setCart({
          ...data,
          loading: false,
        });
        toast.success('Yay! Coupon applied successfully');
      } else {
        throw new Error();
      }
    } catch {
      setCart({ ...cart, loading: false });
      toast.error('Error while applying coupon');
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="-mx-4">
          <div className="p-12 rounded-lg bg-[#FFF8F5]">
            <h2 className="mb-3 homepage-section_headings font-semibold">
              <span className="text-[#EE2F70]">Review your</span>
              <br />
              <span>design package order</span>
            </h2>
          </div>
        </div>

        <div className="lg:pl-8">
          <div className="flex justify-between mb-8 mt-4 items-center">
            <h2>Your order summary</h2>
            <Link href={{ query: { redirect: 'design-cart' }, pathname: '/quiz/order-summary' }} passHref>
              <span className="text-[#EE2F70] text-sm cursor-pointer">Edit Package</span>
            </Link>
          </div>

          {cartItems?.map((item, index) => {
            return (
              <div
                className={`p-4 rounded-lg bg-[#FFF8F5] border border-[#FFF8F5] cursor-pointer flex items-center ${
                  index > 0 ? 'mt-4' : ''
                }`}
                key={item?._id}
              >
                <div className="ml-4 flex items-center">
                  <div>
                    <p>{item?.name}</p>
                    <p className="text-sm flex">
                      <span className="hidden md:block">Package Name:</span>{' '}
                      <span className="inline-block md:hidden">Package:</span>{' '}
                      <span className="capitalize font-bold ml-2">{item?.packageName}</span>
                    </p>
                  </div>
                  <div className="ml-4 md:ml-12">${item?.salePrice}</div>
                </div>
                <div className="ml-auto flex items-center ">
                  {/* <div className="mr-4 text-sm text-[#EE2F70] font-bold">View Package</div> */}
                  <div className="text-sm mr-4 text-[#EE2F70] hidden md:block">
                    <PricingModal btnName={'View Package'} selectBtn={false} pricingData={pricingData} />
                  </div>
                  <div className="text-sm mr-4 text-[#EE2F70] md:hidden block">
                    <PricingModal btnName={'View'} selectBtn={false} pricingData={pricingData} />
                  </div>

                  <div className="relative w-20 h-20">
                    <Image
                      src={`${cloudinary.baseDeliveryURL}/${bgImages[item.name.substr(0, 3)?.toLowerCase()]}`}
                      alt={item?.name}
                      placeholder="blur"
                      blurDataURL={blurredBgImage}
                      // height="60"
                      // width="60"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-8 p-8 bg-gray-100 rounded-lg">
            {discount?.coupons?.length ? (
              <div className="px-2">
                <p className="text-md text-gray-900 flex justify-between font-bold">
                  <span>You saved</span>
                  <span>${discount?.total}</span>
                </p>
                <div className="mt-4">
                  {discount?.coupons?.map((item) => {
                    return (
                      <div className="flex justify-between text-sm" key={item?._id}>
                        <p className="flex items-center">
                          {item?.code}
                          {couponLoader ? (
                            <SVGLoader />
                          ) : (
                            <XCircleIcon
                              className="h-4 w-4 text-gray-500 ml-2 cursor-pointer"
                              onClick={() => removeCoupon(item?._id)}
                            />
                          )}
                        </p>
                        <span>-$ {item?.discount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p>Do you have a coupon code?</p>
                  <div className="grid grid-cols-3 gap-8 mt-4">
                    <input
                      type="text"
                      className="col-span-2 border border-gray-900 rounded-md text-sm"
                      placeholder="Enter Coupon Code"
                      value={couponText}
                      onChange={(e) => setCouponText(e?.target?.value)}
                    />
                    <button
                      className={`bg-gray-900 text-white capitalize rounded-md ${
                        !couponText ? 'pointer-events-none	bg-gray-300' : 'pointer-events-auto	'
                      }`}
                      onClick={() => applyCoupon(couponText)}
                    >
                      {loading ? <SVGLoader /> : <span>Submit</span>}
                    </button>
                  </div>
                  {!couponLoader && availableCoupons && availableCoupons?.length === 0 ? (
                    <div className="mt-8">
                      <h3>Active Coupons</h3>
                      <ul>
                        {availableCoupons?.map((item) => {
                          return (
                            <li key={item?._id} className="flex justify-between items-center mt-2">
                              <span className="px-4 py-2 rounded-lg bg-[#FFDFB9] flex items-center text-[#CC914C] capitalize border-dotted border-[#CC914C]">
                                <TagIcon className="w-4 h-4 text text-[#CC914C]" />
                                <span className="ml-2">{item?.name}</span>
                              </span>
                              <button
                                className="border border-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer"
                                onClick={() => {
                                  applyCoupon(item?.name);
                                }}
                              >
                                {loading ? <SVGLoader /> : <span>Apply Coupon</span>}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
          <div className="mt-8 justify-between flex px-4">
            <span className="font-bold text-gray-900">Total:</span>
            <span className="font-bold text-gray-900">${finalTotal}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8" />
    </>
  );
};

export default React.memo(Index);
