import Image from 'next/image';
import React from 'react';
import { ScrollTrigger, Tween } from 'react-gsap';
import SectionTitle from '../Shared/SectionTitle';

const Featured: React.FC = () => {
  return (
    <>
      <SectionTitle title="Your favorites are talking about us" />
      <div className="container p-4 mx-auto">
        <div className="relative z-10 mx-auto -mb-56 xl:-mb-72 max-w-7xl">
          <div className="p-4 border rounded-lg shadow-lg xl:p-8 border-gray-130 bg-gradient-to-r from-blue-50 to-pink-50">
            <ScrollTrigger start="-500px center" end="-130px center">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:gap-8">
                <Tween
                  from={{ scale: 0.95, opacity: 0, y: 50 }}
                  to={{ scale: 1, opacity: 1, y: 0 }}
                  stagger={0.5}
                  duration={1}
                >
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1644328125/shared/brandsLogo/apartmentTherapy_m07wox.svg"
                      alt="spacejoy happy customer"
                      height={'130'}
                      width={'200'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/hgtv_fohatr.svg"
                      alt="spacejoy happy customer"
                      height={'100'}
                      width={'170'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/goodHouseKeeping_gsw3hd.svg"
                      alt="spacejoy happy customer"
                      height={'130'}
                      width={'200'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1644328125/shared/brandsLogo/parade_qglpbv.svg"
                      alt="spacejoy happy customer"
                      height={'130'}
                      width={'200'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/furnitureDecorLighting_zj27z0.svg"
                      alt="spacejoy happy customer"
                      height={'130'}
                      width={'200'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/w_30/v1644328123/shared/brandsLogo/forbes_ud5zvu.svg"
                      alt="spacejoy happy customer"
                      height={'100'}
                      width={'170'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1658478094/shared/brandsLogo/logo-architectural-digest_no15yk.svg"
                      alt="spacejoy happy customer"
                      height={'80'}
                      width={'130'}
                      layout="intrinsic"
                    />
                  </div>
                  <div className="flex justify-center col-span-1 px-8 py-4 bg-white rounded-md">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/w_350/v1644328123/shared/brandsLogo/businessInsider_pbxfnp.svg"
                      alt="spacejoy happy customer"
                      height={'100'}
                      width={'160'}
                      layout="intrinsic"
                    />
                  </div>
                </Tween>
              </div>
            </ScrollTrigger>
          </div>
          {/* <p className="max-w-3xl mx-auto mt-8 text-center text-gray-50">
            Spacejoy is a great way to try different styles in a room before you shop. It&apos;s the ultimate online
            home shopping experience.
          </p> */}
        </div>
      </div>
      <div className="relative min-h-[300px] sm:min-h-[320px] xl:min-h-[360px]">
        <Image
          className="object-cover filter contrast-125"
          src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,f_auto,q_auto,w_1896,h_759/v1622186205/spj-v2/spj-living-room_gyepig.jpg"
          alt="spacejoy happy customer"
          height={'450'}
          width={'1896'}
          layout="fill"
        />
        <div className="absolute inset-0 bg-gray-800 opacity-70" />
      </div>
    </>
  );
};

export default Featured;
