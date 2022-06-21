import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
const Index = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-12 mb-8">
      <div className="-mx-4">
        <div className="p-12 rounded-lg bg-[#FFF8F5] step-text">
          <h2 className="mb-3 homepage-section_headings font-semibold">
            <span className="text-[#EE2F70]">Hi there!</span>

            <span>&nbsp;Lets build your design package</span>
          </h2>
          <p className="text-lg mt-4 font-normal">
            {' '}
            Please click &quot;<span className="font-bold">Add Room</span>&quot; to begin
          </p>
        </div>
      </div>
      <div>
        <Link href="/quiz/room-select" passHref>
          <button className="bg-gray-900 text-white flex items-center justify center rounded-lg px-12 py-6 text-xl w-full lg:w-auto">
            <PlusIcon className="text-white h-8 w-8" /> <span className="ml-8">Add Room</span>
          </button>
        </Link>
        {/* <div className="rounded-lg bg-gray-100 mt-8 p-12 text-xl">
          <p className="font-bold"> Please Note:</p>
          <p className="mt-8"> We aim to help you build a personalized package for every room in your home</p>
          <p className="mt-8">
            {' '}
            By clicking <span className="font-bold">&quot;Add Room&quot;</span>
          </p>{' '}
          you will be redirected to a page which allows you tot select a room type and a package for that room.
          <p className="mt-8">Ready when you are!</p>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
