import errorLottie from '@public/lotties/error.json';
import React from 'react';
import LottieAnimation from './LottieAnimation';
import SectionTitle from './SectionTitle';
import Link from 'next/link';

const ErrorState = ({ status }: { status: number }): JSX.Element => {
  return (
    <div className="container px-4 py-4 mx-auto mb-10">
      <div className="w-1/3 mx-auto">
        <LottieAnimation animationData={errorLottie} />
      </div>
      <div className="w-full mx-auto text-center">
        <SectionTitle
          title="Page Not Found"
          feature={`${status}`}
          description="Sorry, the page you're looking for isn't here. Let's go home and try again."
        />
        <Link href="/" passHref>
          <button
            type="button"
            className="px-6 py-3 mt-4 text-base text-white uppercase bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
          >
            Take Me Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(ErrorState);
