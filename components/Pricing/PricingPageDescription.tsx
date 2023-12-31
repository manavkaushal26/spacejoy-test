import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PricingPageDescription = () => {
  return (
    <>
      <div className="m-4">
        <Link href="/quiz/start-quiz">
          <a className=" relative aspect-[3.5]">
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1630686591/Wait_a_moment_inject_banner-2_itfloy.jpg`}
              alt="Wait a moment banner"
              layout="responsive"
              height={600}
              width={2084}
              className="rounded-md"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col mx-4 space-y-20">
        <div className="flex flex-col justify-center text-center sm:flex-row sm:space-x-10">
          <div className="relative mx-auto aspect-1 h-28 w-28 sm:h-24 sm:w-24 sm:mx-0">
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1577846283/web/Spacejoy-promise_pxbyfc.svg`}
              alt="money-back badge"
              layout="fill"
              className="object-contain "
            />
          </div>
          <div className="max-w-3xl mx-auto my-auto text-sm text-center sm:text-base sm:text-left">
            <p>
              Joyous homes, happy customers is our motto. If your design experience with us is not up to par, we will do
              our best to rectify it. If our attempts have not made a difference, connect with us at{' '}
              <a href="mailto:hello@spacejoy.com" target="_blank" rel="noreferrer" className="text-blue-500">
                hello@spacejoy.com
              </a>{' '}
              so we can find a resolution!
            </p>
          </div>
        </div>
        <div className="flex flex-col px-4 mx-auto space-y-5 text-sm sm:text-base max-w-7xl sm:px-6 lg:px-8">
          <p>
            There is something for everyone - on a budget! Today, access to interior designs online has never been
            easier, and all praise goes out to the number of available online design services out there. You can design
            any space in your home at the click of a button and avail the best interior design pricing packages. At
            Spacejoy, it’s all about budget interior designs where you as a client can begin by hiring an interior
            designer on a budget to help transform your space at any given time and well, at any given destination.
          </p>
          <p>
            These budget-friendly options at Spacejoy make it possible for homeowners to view their ideal place in 3D
            along with the benefit of multiple revisions, 1:1 with a design expert, and quick response of design
            delivery. Spacejoy also provides an extensive and customized shopping list of all products features in your
            design so that you can shop right away.
          </p>
          <p>
            The Interior design pricing packages at Spacejoy are reasonable and valuable. To help you get started, try
            the Delight package. The Bliss package is often the right one for most clients, and if you love a good deal
            – the Euphoria package is a great option that features an hour call with your designer. Pick from one of our
            three online interior design price packages that are custom-made, keeping your budget, style, and interior
            design needs in mind.
          </p>
        </div>
      </div>
    </>
  );
};

export default PricingPageDescription;
