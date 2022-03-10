import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AffirmBanner = () => {
  return (
    <div className="container max-w-screen-xl mx-auto mt-16 mb-6">
      <div className="relative hidden sm:block aspect-[483/113]">
        <Image
          src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1646906285/web/homev3/affirm_desktop_banner_xm8hn8.jpg"
          alt="Affirm Banner"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="relative sm:hidden aspect-[160/119]">
        <Image
          src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1646906286/web/homev3/affirm_mobilebanner_jodvli.jpg"
          alt="Affirm Banner"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default AffirmBanner;
