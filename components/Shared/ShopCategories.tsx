import { useShopFilterContext } from '@store/ShopFilterContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const ShopCategories = () => {
  const {
    filters: { category = [] },
    updateFilter,
  } = useShopFilterContext();

  const router = useRouter();

  const splitCategories = useMemo(() => {
    let [...arr] = category;
    var res = [];
    while (arr.length) {
      res.push(arr.splice(0, 2));
    }
    return res;
  }, [category]);

  return (
    <div className="grid grid-cols-7 gap-4">
      {splitCategories?.map((categorySet, index) => {
        return (
          <div key={index}>
            {categorySet.map((item) => {
              return (
                <div key={item?._id} className="bg-gray-50 p-4 mt-4">
                  <h3 className="font-semibold text-sm">{item?.name}</h3>
                  <ul key={item?._id}>
                    {item?.subCategories?.map((subCategory) => {
                      return (
                        <Link
                          href={{
                            pathname: '/shop',
                            query: {
                              subcategory: subCategory?.name,
                            },
                          }}
                          key={subCategory?._id}
                        >
                          <a>
                            <li
                              className="text-sm pt-1 text-gray-700 cursor-pointer hover:underline capitalize"
                              onClick={() => updateFilter(subCategory?._id, 'subCategory')}
                            >
                              {subCategory?.name}
                            </li>
                          </a>
                        </Link>
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
  );
};

export default React.memo(ShopCategories);