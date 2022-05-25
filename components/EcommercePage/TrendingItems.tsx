import ProductCard from '@components/Shop/ProductCard';
import React, { useEffect, useMemo, useState } from 'react';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import SectionHeading from './SectionHeading';
import fetcher from '@utils/fetcher';
import Carousel from '@components/Carousel';
import Link from 'next/link';
import { PushEvent } from '@utils/analyticsLogger';

const sliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 1.2,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 4000,
};

const TrendingItems: React.FC<{ page?: boolean; mobile?: boolean }> = ({ page, mobile }) => {
  const { data } = useFirebaseContext();
  const [productsData, setProductsData] = useState<any>({});
  const productsDataArr: any = Object.values(productsData).slice(0, -1);
  const dataToDisplay = useMemo(
    () =>
      page
        ? productsDataArr.filter((item) => item.inStock === true)
        : productsDataArr.slice(0, 12).filter((item) => item.inStock === true),
    [productsDataArr]
  );

  const fetchMultipleProducts = async () => {
    const res = await fetcher({
      endPoint: '/v1/assets/getAssetsDetail',
      method: 'POST',
      body: {
        assets: data?.productSection?.listOfProducts,
        fields: ['name', 'cdn', 'retailer', 'price', 'msrp', 'slug', 'status', 'inStock'],
      },
    });

    if (res?.statusCode) {
      setProductsData(res.data);
    }
  };

  useEffect(() => {
    if (data?.productSection?.listOfProducts?.length) {
      fetchMultipleProducts();
    }
  }, [data?.productSection?.listOfProducts]);

  return (
    <>
      {dataToDisplay.length !== 0 ? (
        <div className={`bg-[#ECF1F4] w-full mx-auto ${!page ? 'mt-16 mb-8 py-8 pl-4' : 'py-16 px-4'}`}>
          <div className="container max-w-7xl mx-auto">
            {!page ? (
              <>
                <div className="py-6">
                  <SectionHeading title="Hot Deals" noMargin />
                </div>
                <div>
                  <div className="collections-slider">
                    <Carousel imageCount={dataToDisplay?.length || 0} responsive={sliderSettings} slidesToShow={4}>
                      {dataToDisplay.map((product: any) => (
                        <ProductCard key={product._id} product={product} showViewDetails pageName="hot-deals" />
                      ))}

                      <Link href={'/hot-deals'}>
                        <a
                          target={!mobile ? '_blank' : ''}
                          onClick={() => {
                            PushEvent({
                              category: `Hot Deals Section - See More Click`,
                              action: `Go to Hot Deals Page`,
                              label: `See More Deals`,
                            });
                          }}
                        >
                          <div className="h-full bg-red-100 flex items-center justify-center rounded-lg hover:z-30 hover:scale-[1.02] relative transition hover:shadow-xl text-2xl font-semibold text-center">
                            See More
                            <br />
                            Deals
                          </div>
                        </a>
                      </Link>
                    </Carousel>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                {dataToDisplay.map((product: any) => (
                  <ProductCard key={product._id} product={product} showViewDetails={!page ? true : false} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TrendingItems;
