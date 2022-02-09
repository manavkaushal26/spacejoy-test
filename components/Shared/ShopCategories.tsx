import { useShopFilterContext } from '@store/ShopFilterContext';
import React, { useMemo } from 'react';

const ShopCategories = ({ callback }) => {
  const {
    filters: { category = [] },
    updateFilter,
  } = useShopFilterContext();

  const splitCategories = useMemo(() => {
    let [...arr] = category;
    var res = [];
    while (arr.length) {
      res.push(arr.splice(0, 2));
    }

    return res;
  }, [category]);

  return (
    <>
      <div className="flex flex-row space-x-5">
        <div
          className="flex flex-col justify-end h-full p-4 cursor-pointer bg-gray-50 hover:underline"
          onClick={() => (location.href = '/shop')}
        >
          {/* <div className="text-left">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/h_300,w_300/v1622188232/spj-v2/3d-icons/spj-13_khzmql.png"
              alt="No markups"
              height={'75'}
              width={'75'}
              layout="intrinsic"
            />
          </div> */}
          <div>
            <h5 className="mt-2 text-sm">All Categories</h5>
            {/* <p className="mb-2 text-sm">100% Happiness Delivered</p> */}
            {/* <ArrowRightIcon className="w-4 h-4" /> */}
          </div>
        </div>
        {/* <div
          className="flex flex-col justify-end h-full p-4 cursor-pointer bg-gray-50 hover:underline"
          onClick={() => (location.href = `${oldSpacejoyUrl}/furniture-decor-shop`)}
        >
          <div>
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/h_300,w_300/v1622188242/spj-v2/3d-icons/spj-25_dhewua.png"
              alt="No markups"
              height={'55'}
              width={'75'}
              layout="intrinsic"
            />
          </div>
          <div>
            <h5 className="mt-2 text-sm">Furniture Decor Shop</h5>
            <p className="mb-2 text-sm">Tips & Guides</p>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {splitCategories?.map((categorySet, index) => {
          return (
            <div key={index}>
              {categorySet.map((item) => {
                return (
                  <div key={item?._id} className="p-4 mt-4 bg-gray-50">
                    <h3 className="pl-1 text-sm font-semibold">{item?.name}</h3>
                    <ul key={item?._id}>
                      {item?.subCategories?.map((subCategory) => {
                        return (
                          <a
                            className="block rounded pl-1 py-0.5 focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                            key={subCategory?._id}
                          >
                            <li
                              className="text-sm text-gray-700 capitalize cursor-pointer hover:underline"
                              onClick={() => {
                                updateFilter(subCategory?._id, 'subCategory', ['vertical']);
                                callback && callback();
                              }}
                            >
                              {subCategory?.name}
                            </li>
                          </a>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(ShopCategories);
