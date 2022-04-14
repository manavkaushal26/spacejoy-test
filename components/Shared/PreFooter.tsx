import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import React from 'react';

const PreFooter: React.FC = () => {
  const isMobile = Cookies.get('isMobile');

  return (
    <div className="relative py-28">
      <div className="relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-700 mb-7">
            Ready to{isMobile === 'true' ? <br /> : ' '}get started?
          </h2>
          <button
            type="button"
            className="px-12 py-3 text-base text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
            onClick={() => (location.href = '/new-project')}
          >
            Start Your Project <ArrowNarrowRightIcon className="inline w-4 h-4 transition group-hover:translate-x-1" />
          </button>
          {/* <p className="mt-5">
          <Link href="/pricing">
            <a className="px-1 text-sm text-gray-600 rounded hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
              Checkout packages now
            </a>
          </Link>
        </p> */}
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
