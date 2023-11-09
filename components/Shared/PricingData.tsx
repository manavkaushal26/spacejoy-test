import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { CheckIcon } from '@heroicons/react/outline';
import React, { useMemo } from 'react';

type Props = {
  data: any;
  variant?: 'new' | 'old';
};

const Index = ({ data, variant = 'old' }: Props) => {
  const minPackagePrice = useMemo(() => {
    return Math.min.apply(
      null,
      data?.map((item) => item?.salePrice?.value)
    );
  }, [data]);

  const title = 'Designing made accessible';
  const subTitle = `Choose from ${data?.length} package options, starting at just $${minPackagePrice}. We have everything for
            every need`;

  if (variant === 'new')
    return (
      <>
        <HomeSectionTitle className="text-center">
          <HomeSectionTitle.MainTitle>{title}</HomeSectionTitle.MainTitle>

          <HomeSectionTitle.Description align="center">{subTitle}</HomeSectionTitle.Description>
        </HomeSectionTitle>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3 lg:gap-16">
          {data?.slice(0, 4)?.map((item) => {
            return (
              <div className="p-8 bg-cover border-2 border-black rounded-lg" key={item?.name}>
                <h2 className="text-3xl text-center capitalize">{item?.name}</h2>
                <p className="mt-5 text-5xl font-bold text-center">${item?.salePrice?.value}</p>
                <p className="mb-4 ml-2 text-3xl font-semibold text-center text-gray-400 line-through">
                  ${item?.price?.value}
                </p>
                <div className="text-lg leading-10">
                  {item?.features?.map((feature) => {
                    return (
                      <p className="flex items-center" key={feature?._id}>
                        <CheckIcon className="h-7 w-7 text-[#292929]" />
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

  if (variant === 'old')
    return (
      <>
        <HomeSectionTitle className="text-center">
          <HomeSectionTitle.MainTitle>Designing made accessible</HomeSectionTitle.MainTitle>

          <HomeSectionTitle.Description align="center">
            Choose from {data?.length} package options, starting at just ${minPackagePrice}. We have everything for
            every need
          </HomeSectionTitle.Description>
        </HomeSectionTitle>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3 lg:gap-16">
          {data?.slice(0, 4)?.map((item) => {
            return (
              <div className="p-8 bg-cover rounded-xl bg-card-texture" key={item?.name}>
                <h2 className="text-2xl capitalize">{item?.name}</h2>
                <p className="my-4">
                  <span className="text-2xl font-bold">${item?.salePrice?.value}</span>
                  <span className="ml-2 text-lg font-bold text-gray-400 line-through">${item?.price?.value}</span>
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
