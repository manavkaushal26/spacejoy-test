import { classNames } from '@utils/helpers';
import { ReactNode } from 'react';

type BaseCardProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

const BaseCard = ({ children, className = '', containerClassName = '' }: BaseCardProps) => {
  return (
    <div className={classNames('overflow-hidden bg-white rounded-lg shadow', containerClassName)}>
      <div className={classNames('px-4 py-5 sm:p-6', className)}>{children}</div>
    </div>
  );
};

export default BaseCard;
