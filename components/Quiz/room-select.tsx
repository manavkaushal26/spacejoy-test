import { useStore } from '@lib/offerStore';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary, company, imageKit } from '@utils/config';
import Head from 'next/head';
import Image from 'next/image';
import React, { useLayoutEffect } from 'react';
import shallow from 'zustand/shallow';

const Index = () => {
  const { updateRoomSelection, resetRoomsList, rooms, removeRoomWithoutPackage } = useStore(
    (store) => ({
      updateRoomSelection: store?.updateRoomSelection,
      resetRoomsList: store?.resetRoomsList,
      rooms: store?.rooms,
      removeRoomWithoutPackage: store?.removeRoomWithoutPackage,
    }),
    shallow
  );
  useLayoutEffect(() => {
    resetRoomsList();
  }, []);

  return (
    <>
      <Head>
        <title key="title">Interior Design Style Quiz | {company.product}</title>
        <meta
          key="description"
          name="description"
          content="Discover the design style you would prefer for your home with our style quiz. Get personalized results & create a home you love with our budget-friendly packages."
        />
      </Head>
      <div className="grid grid-cols-1 gap-4 ">
        <div className="-mx-4">
          <div className="p-12 rounded-lg bg-[#FFF8F5]">
            <h2 className="mb-3 font-semibold homepage-section_headings">
              <span className="text-[#EE2F70]">Add a new room</span>

              <span>&nbsp;to your package</span>
            </h2>
            <p className="text-lg font-normal">Please choose the space you want to decorate</p>
          </div>
        </div>

        <div className="pl-16" />
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-2">
        {rooms?.map((item) => {
          return (
            <div
              className={`p-4 pl-8 rounded-lg bg-white border border-gray-300 cursor-pointer flex items-center ${
                item?.selected ? 'bg-[#FFF8F5] border-[#FFF8F5] shadow-sm' : 'bg-white border-gray-300 '
              }`}
              key={item?._id}
              onClick={() => updateRoomSelection(item?._id)}
            >
              <input
                type="radio"
                // name="room"
                checked={item?.selected}
                className={`w-5 h-5 text-gray-900  cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white `}
              />
              <label className="ml-4 text-xl capitalize cursor-pointer lg:text-xl xl:text-2xl">{item?.name}</label>
              <div className="relative w-20 h-20 ml-auto rounded-lg">
                <div>
                  <Image
                    src={`${imageKit.baseDeliveryUrl}/${item?.cdnThumbnail}`}
                    alt={item?.name}
                    placeholder="blur"
                    blurDataURL={blurredBgImage}
                    // height="60"
                    // width="60"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
