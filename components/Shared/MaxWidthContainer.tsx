import { classNames } from '@utils/helpers';
import React, { ReactNode } from 'react';

interface MaxWidthContainerProps {
  children: ReactNode;
  className?: string;
}

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({ children, className = '' }) => {
  return <div className={classNames('mx-auto max-w-screen-2xl px-4 sm:px-8 md:px-12', className)}>{children}</div>;
};

export default MaxWidthContainer;
