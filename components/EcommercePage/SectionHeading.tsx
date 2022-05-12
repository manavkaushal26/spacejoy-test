import React from 'react';

const SectionHeading: React.FC<{ title: string; subTitle?: string; noMargin?: boolean }> = ({
  title,
  subTitle,
  noMargin,
}) => {
  return (
    <div className={`w-full space-y-2 text-left ${noMargin ? 'mt-0 mb-0' : 'mt-16 mb-8'}`}>
      <h2 className="text-3xl font-semibold lg:text-3xl">{title}</h2>
      {subTitle && <p className="text-base lg:text-xl lg:w-3/4 lg:mx-auto">{subTitle}</p>}
    </div>
  );
};

export default SectionHeading;
