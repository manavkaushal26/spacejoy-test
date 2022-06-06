import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { CheckIcon } from '@heroicons/react/outline';
import React, { useMemo } from 'react';

const Index = ({ data }) => {
  const minPackagePrice = useMemo(() => {
    return Math.min.apply(
      null,
      data?.map((item) => item?.salePrice?.value)
    );
  }, [data]);

  return (
    <>
      <HomeSectionTitle className="text-center">
        <HomeSectionTitle.MainTitle>Designing made accessible</HomeSectionTitle.MainTitle>

        <HomeSectionTitle.Description align="center">
          Choose from {data?.length} package options, starting at just ${minPackagePrice}. We have everything for every
          need
        </HomeSectionTitle.Description>
      </HomeSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-12">
        {data?.slice(0, 4)?.map((item) => {
          return (
            <div className="p-8 bg-cover rounded-xl bg-card-texture" key={item?.name}>
              <h2 className="capitalize text-2xl">{item?.name}</h2>
              <p className="my-4">
                <span className="text-2xl font-bold">${item?.salePrice?.value}</span>
                <span className="text-lg font-bold ml-2 line-through text-gray-400">${item?.price?.value}</span>
              </p>
              <div className="leading-10">
                {item?.features?.map((feature) => {
                  return (
                    <p className="flex items-center" key={feature?._id}>
                      <CheckIcon className="h-6 w-6 text-[#6AC18E]" />
                      <span className="ml-2 font-bold">{feature?.label}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
