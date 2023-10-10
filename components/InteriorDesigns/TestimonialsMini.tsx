import UserCard from '@components/Cards/UserCard';
import { imageKit } from '@utils/config';
import Testimonials from '@utils/Mocks/Testimonials';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function TestimonialsMini() {
  const randomTestimonial = getRandomInt(Testimonials.length);

  return (
    <div className="">
      <div className="p-5 m-0 rounded-lg shadow-none bg-yellow-50">
        <div className="relative grid content-between">
          <div className="flex flex-col space-y-4 ">
            <h2 className="text-xl ">{Testimonials[randomTestimonial].shortDescription}</h2>
            <p className="text-sm ">{Testimonials[randomTestimonial].description}</p>
            <div className="flex justify-between ">
              <UserCard
                name={Testimonials[randomTestimonial].name}
                address={Testimonials[randomTestimonial].address}
                ratings={Testimonials[randomTestimonial].ratings}
                align="left"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 col-span-2 -mb-1 overflow-hidden border-white ring-2 ring-white border-1">
              {/* c_fill,g_faces,h_150,w_150/ */}
              <Image src={`${imageKit.baseDeliveryUrl}/${Testimonials[randomTestimonial].dp}`} alt="" layout="fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
