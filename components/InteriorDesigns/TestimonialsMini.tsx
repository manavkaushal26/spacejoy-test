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
      <div className="m-0 shadow-none bg-yellow-50 p-5 rounded-lg">
        <div className="grid content-between relative">
          <div className=" flex flex-col space-y-4">
            <h2 className=" text-xl">{Testimonials[randomTestimonial].shortDescription}</h2>
            <p className=" text-sm">{Testimonials[randomTestimonial].description}</p>
            <div className=" flex justify-between">
              <UserCard
                name={Testimonials[randomTestimonial].name}
                address={Testimonials[randomTestimonial].address}
                ratings={Testimonials[randomTestimonial].ratings}
                align="left"
              />
            </div>
            <div className="absolute bottom-0 right-0 col-span-2  ring-2 ring-white h-24 w-24 -mb-1 border-1 border-white overflow-hidden">
              <Image
                src={`${imageKit.baseDeliveryUrl}/c_fill,g_faces,h_150,w_150/${Testimonials[randomTestimonial].dp}`}
                alt=""
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
