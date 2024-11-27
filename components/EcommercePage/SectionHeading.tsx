import React from 'react';

const SectionHeading: React.FC<{ title: string; subTitle?: string; noMargin?: boolean; center?: boolean }> = ({
  title,
  subTitle,
  noMargin,
  center,
}) => {
  return (
    <div
      className={`w-full space-y-2 ${center ? 'text-center' : 'text-left'} ${noMargin ? 'mt-0 mb-0' : 'mt-16 mb-8'}`}
    >
      <h2 className="text-3xl font-semibold capitalize lg:text-5xl">{title}</h2>
      {subTitle && <p className="text-base text-zinc-500 lg:text-xl lg:mx-auto">{subTitle}</p>}
    </div>
  );
};

export default SectionHeading;
