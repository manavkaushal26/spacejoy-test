import { classNames } from '@utils/helpers';
import { ElementType, ReactNode } from 'react';

type MaxWidthContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType; // Polymorphic prop for root element
  ariaLabel?: string;
};

const MaxWidthContainer = ({
  children,
  className = '',
  as: Component = 'div', // Default to `div`
  ariaLabel,
}: MaxWidthContainerProps) => {
  return (
    <Component
      className={classNames('container px-4 pt-4 sm:pt-10 pb-10 mx-auto sm:pb-28 text-gray-700', className)}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
};

export default MaxWidthContainer;
