import { CategoryData } from '@utils/Mocks/EcommercePageData';
import React from 'react';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import Carousel, { position } from '@components/Shared/Carousel';

const CategoryToShop = ({ mobile }) => {
  return (
    <div>
      <SectionHeading title="Shop all things home in one place" />
      <div className="hidden max-w-screen-xl gap-4 mx-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CategoryData.map((category, index) => (
          <Link
            key={category.id}
            href={{
              pathname: `/shop`,
              query: new URLSearchParams({
                ...{ ...(category?.category ? { category: `${category.category}` } : {}) },
                ...{ ...(category?.subcategory ? { subcategory: `${category.subcategory}` } : {}) },
                ...{ ...(category?.vertical ? { vertical: `${category.vertical}` } : {}) },
                ...{
                  ...(category?.discount
                    ? { discount: [`${category.discount.start}`, `${category.discount.upto}`].join('::') }
                    : []),
                },
              }).toString(),
            }}
            passHref
          >
            <a target={!mobile ? '_blank' : ''}>
              <CategoryCard data={category} index={index} />
            </a>
          </Link>
        ))}
      </div>
      <div className="sm:hidden">
        <Carousel centerPadding="0%" centerMode customButtons position={position.outside}>
          {CategoryData.map((category, index) => (
            <Link
              key={category.id}
              href={{
                pathname: `/shop`,
                query: new URLSearchParams({
                  ...{ ...(category?.category ? { category: `${category.category}` } : {}) },
                  ...{ ...(category?.subcategory ? { subcategory: `${category.subcategory}` } : {}) },
                  ...{ ...(category?.vertical ? { vertical: `${category.vertical}` } : {}) },
                  ...{
                    ...(category?.discount
                      ? { discount: [`${category.discount.start}`, `${category.discount.upto}`].join('::') }
                      : []),
                  },
                }).toString(),
              }}
              passHref
            >
              <a>
                <CategoryCard data={category} index={index} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryToShop;
