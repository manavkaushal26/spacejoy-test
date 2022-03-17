import { blurredBgImage } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const v3 = () => {
  return (
    <div className="container relative mx-auto">
      <div className="absolute inset-0">
        <Image
          className="object-cover rounded-lg"
          src="https://res.cloudinary.com/spacejoy/image/upload/v1646914328/web/homepage-v3/Hero_Banner_Render_V3-min_tkefad.jpg"
          alt="home banner"
          layout="fill"
          placeholder="blur"
          blurDataURL={blurredBgImage}
          priority
        />
        {/* https://res.cloudinary.com/spacejoy/image/upload/v1643862497/web/homepage-v3/New_Website_Banner_-_2-1_ttykfb.jpg */}
      </div>
      <div className="flex flex-col min-h-[700px] justify-center items-center relative z-10">
        <div className="absolute top-20">
          <h1 className="mb-1 text-4xl leading-normal text-center md:text-5xl md:leading-normal">
            Home decorating, simplified
          </h1>
          <h4 className="text-lg leading-normal text-center sm:text-xl sm:leading-normal">
            See it. Try it. Buy it. It’s that easy!
          </h4>
        </div>

        <Link href="/room-select" passHref>
          <button
            type="button"
            className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none relative -top-20"
            onClick={() => {
              PushEvent({
                category: `Top Banner Get Started`,
                action: `Go to Room Selection`,
                label: `HP First Banneer Main CTA`,
              });
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(v3);
