import { ArrowRightIcon } from '@heroicons/react/outline';
import { classNames } from '@utils/helpers';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const ShinyButton = ({ className, children, href, ...props }: ShinyButtonProps) => {
  return (
    <Link href={href ?? '#'}>
      <a
        className={classNames(
          'w-fit group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-black bg-black text-base font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-black hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 py-2 px-4',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRightIcon className="w-4 h-4 shrink-0 text-white transition-transform duration-3000 ease-in-out group-hover:translate-x-[2px]" />
        </span>
        <div className="ease-[cubic-bezier(0.19, 1, 0.22, 1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
      </a>
    </Link>
  );
};

export default ShinyButton;
