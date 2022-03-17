import React from 'react';

const SectionHeading: React.FC<{ title: string; subTitle?: string }> = ({ title, subTitle }) => {
  return (
    <div className="w-full mt-16 mb-8 space-y-2 text-left lg:text-center">
      <h2 className="text-3xl font-semibold lg:text-4xl">{title}</h2>
      {subTitle && <p className="text-base lg:text-xl lg:w-3/4 lg:mx-auto">{subTitle}</p>}
    </div>
  );
};

export default SectionHeading;
