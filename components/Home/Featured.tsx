import FeaturedData from '@mocks/FeaturedData';
import Image from 'next/image';
import React from 'react';
import { ScrollTrigger, Tween } from 'react-gsap';
import SectionTitle from '../Shared/SectionTitle';

const Featured: React.FC = () => {
  return (
    <>
      <SectionTitle
        feature="Media"
        title="Your favorites are talking about us"
        description=""
      />
      <div className="container mx-auto p-4">
        <div className="-mb-56 xl:-mb-72 max-w-7xl mx-auto z-10 relative">
          <div className="p-4 xl:p-8 shadow-lg rounded-lg border border-gray-130 bg-gradient-to-r from-blue-50 to-pink-50">
            <ScrollTrigger start="-500px center" end="-130px center">
              <div className="grid gap-4 xl:gap-8 grid-cols-4">
                <Tween
                  from={{ scale: 0.95, opacity: 0, y: 50 }}
                  to={{ scale: 1, opacity: 1, y: 0 }}
                  stagger={0.5}
                  duration={1}
                >
                  <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328125/shared/brandsLogo/apartmentTherapy_m07wox.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/hgtv_fohatr.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/goodHouseKeeping_gsw3hd.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328125/shared/brandsLogo/parade_qglpbv.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/furnitureDecorLighting_zj27z0.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/forbes_ud5zvu.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/cnn_xwsrzu.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white">
                      <Image
                        src="https://res.cloudinary.com/spacejoy/image/upload/v1644328123/shared/brandsLogo/businessInsider_pbxfnp.svg"
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                    
                  {/* {FeaturedData.map((item) => (
                    <div className="col-span-1 flex justify-center py-4 px-8 rounded-md bg-white" key={item.id}>
                      <Image
                        src={item.logo}
                        alt="spacejoy happy customer"
                        height={'130'}
                        width={'200'}
                        layout="intrinsic"
                      />
                    </div>
                  ))} */}
                </Tween>
              </div>
            </ScrollTrigger>
          </div>
          <p className="max-w-3xl mx-auto text-gray-50 text-center mt-8">
            Spacejoy is a great way to try different styles in a room before you shop. It&apos;s the ultimate online
            home shopping experience.
          </p>
        </div>
      </div>
      <div className="relative ">
        <Image
          className="filter contrast-125 object-cover"
          src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,f_auto,q_auto,w_1896,h_759/v1622186205/spj-v2/spj-living-room_gyepig.jpg"
          alt="spacejoy happy customer"
          height={'450'}
          width={'1896'}
          layout="responsive"
        />
        <div className="absolute inset-0 bg-gray-800 opacity-70" />
      </div>
    </>
  );
};

export default Featured;
