import Badge from '@components/Shared/Badge';
import React, { ReactNode } from 'react';

const SectionHeading: React.FC<{
  preText?: string;
  title: string | ReactNode;
  subTitle?: string;
  noMargin?: boolean;
  center?: boolean;
}> = ({ preText = '', title, subTitle = '', noMargin = false, center = false }) => {
  return (
    <div
      className={`w-full space-y-2 ${center ? 'text-center' : 'text-left'} ${noMargin ? 'mt-0 mb-0' : 'mt-16 mb-8'}`}
    >
      {preText && <Badge content={preText} />}
      <h2 className="text-3xl font-semibold capitalize lg:text-5xl">{title}</h2>
      {subTitle && <p className="text-base text-gray-500 lg:text-xl lg:mx-auto">{subTitle}</p>}
    </div>
  );
};

export default SectionHeading;
