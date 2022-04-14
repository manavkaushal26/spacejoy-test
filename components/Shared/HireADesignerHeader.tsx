import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export const HireADesignerHeader = () => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <div className="">
      <div className="flex space-x-10">
        <div className="flex flex-col py-8 px-5 justify-between shadow-sm rounded-xl bg-[#fef2ee]">
          <div className=" text-2xl leading-normal">
          Your home,<br/> designed by experts
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="group overflow-hidden shadow-sm hover:shadow-lg text-sm whitespace-nowrap text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
              onClick={() => {
                location.href = `${oldSpacejoyUrl}/new-project`;
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="flex flex-col py-8 px-5 shadow-sm rounded-xl bg-[#f0f0f0]">
          <div className=" text-lg leading-normal">
          Know more
          </div>
          <div className="mt-8 flex flex-col space-y-3">
            <Link href={`${oldSpacejoyUrl}/online-room-design`} passHref>
              <a target="_blank" className=" text-sm font-normal hover:underline">How it works{"  "}→</a>
            </Link>

            <Link href="/pricing" passHref>
              <a className=" text-sm font-normal hover:underline">Pricing{"  "}→</a>
            </Link>

            <Link href={`${oldSpacejoyUrl}/style-quiz`} passHref>
              <a target="_blank" className=" text-sm font-normal hover:underline">Style Quiz{"  "}→</a>
            </Link>

            <Link href={`${oldSpacejoyUrl}/online-room-design#:~:text=FREQUENTLY%20ASKED%20QUESTIONS`} passHref>
              <a target="_blank" className=" text-sm font-normal hover:underline">Design Service FAQs{"  "}→</a>
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
};
