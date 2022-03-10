import { useShopFilterContext } from '@store/ShopFilterContext';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
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
      <h3 className="text-3xl mb-6">Shop By Category</h3>
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
                            onClick={() => {
                              PushEvent({
                                category: `Top Nav - Shop by Sub-category`,
                                action: `Go to ${subCategory?.name} List Page`,
                                label: `Shop Now`,
                              });
                            }}
                          >
                            <li
                              className="text-sm text-gray-700 capitalize cursor-pointer hover:underline"
                              onClick={() => {
                                updateFilter(subCategory?._id, 'subCategory', ['vertical', 'page']);
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
