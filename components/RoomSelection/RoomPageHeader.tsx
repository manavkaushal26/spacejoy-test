import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { pinterestConfig } from '@utils/config';
import topCollages, { SlugToCategory } from '@utils/Mocks/topCollages';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';

const RoomPageHeader: NextPage<{
  category: string;
  onCategoryChange: any;
  setIsOpen: any;
  isHeaderMobile: boolean;
}> = ({ category, onCategoryChange = () => {}, setIsOpen, isHeaderMobile }) => {
  const router = useRouter();
  // console.log(isHeaderMobile);
  const [selectedRoomType, setSelectedRoomType] = useState(category);

  const handleRoomTypeChange = (room) => {
    const currentQueryParam = router.query;

    router.replace(
      {
        pathname: router?.pathname,
        query: { ...currentQueryParam, slugParam: room?.slug },
      },
      undefined,
      { shallow: true }
    );
    // router.push(`/design-sets/room/${room?.slug}`);
    onCategoryChange && onCategoryChange(SlugToCategory[room?.slug]);
    setSelectedRoomType(room.name);
  };

  return isHeaderMobile ? (
    <div className="flex my-4 gap-4 justify-between items-center sticky top-20 z-20 bg-gray-100">
      <div className="w-1/2 lg:w-1/2 text-base text-right lg:text-4xl xl:leading-snug">
        <Menu as="div" className="relative inline-block text-left w-full">
          <div>
            <Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm capitalize font-medium bg-white rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {selectedRoomType}
              <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-violet hover:text-violet-100" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 divide-y divide-gray-100">
                {topCollages.list.map((room, idx) => {
                  return (
                    <Menu.Item key={idx}>
                      {({ active }) => (
                        <button
                          onClick={() => handleRoomTypeChange(room)}
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm capitalize`}
                        >
                          {room.name}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="rounded-3xl py-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-grow items-center space-x-2 px-4 py-2 text-base font-medium text-white bg-black shadow-xs cursor-not-allowed group hover:shadow-md rounded-md focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="whitespace-nowrap text-ellipsis">Filters</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex my-4 gap-4 pt-6 pb-4 items-center bg-gray-100">
      <div className="w-1/3 lg:w-1/2 text-base lg:text-4xl xl:leading-snug">
        <span className="font-bold capitalize">{category} Sets</span>
      </div>
      {pinterestConfig.enable === true && (
        <div className="rounded-3xl py-4 px-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="text-sm lg:text-xl text-bold flex-grow font-bold">
            Shop products from your <br />
            favorite pins
          </div>
          <Link href="/pinterest/search">
            <a className=" flex-grow bg-red-600/75 px-3 py-3 rounded-full text-ellipsis overflow-hidden flex space-between text-xs lg:text-base items-center transition-all font-bold gap-4 text-white hover:shadow-lg ">
              <Image
                src={
                  'https://res.cloudinary.com/spacejoy/image/upload/v1640335624/web/pinterest-integration/icons/badgeRGB-FFFFFF_iozyje.svg'
                }
                alt="pinterest logo"
                className=" h-8 w-8"
                width="64px"
                height="64px"
              />
              <span className="whitespace-nowrap text-ellipsis">Connect to Pinterest</span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RoomPageHeader;
