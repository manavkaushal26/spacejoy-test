import { classNames } from '@utils/helpers';
import { ReactNode } from 'react';

type BaseCardProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientBorder?: boolean;
  disabledHoverShadow?: boolean;
};

const BaseCard = ({
  children,
  className = '',
  containerClassName = '',
  gradientBorder = false,
  disabledHoverShadow = false,
}: BaseCardProps) => {
  return (
    <div className="group relative p-0.5">
      {gradientBorder && (
        <div className="absolute inset-0 rounded-lg -z-10 bg-gradient-to-br from-spj-red via-spj-yellow to-transparent" />
      )}
      <div
        className={classNames(
          'z-10 overflow-hidden bg-white rounded-lg shadow-md transition-all duration-200',
          { 'border border-gray-100': !gradientBorder },
          { 'group-hover:shadow-lg': !disabledHoverShadow },
          containerClassName
        )}
      >
        <div className={classNames('px-4 py-5 sm:p-6', className)}>{children}</div>
      </div>
    </div>
  );
};

export default BaseCard;
