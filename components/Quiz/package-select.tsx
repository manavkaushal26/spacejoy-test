import PricingModal from '@components/Shared/PricingModal';
import { CheckIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/offerStore';
import { company } from '@utils/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import shallow from 'zustand/shallow';
import { PushEvent } from '@utils/analyticsLogger';
import { useSession } from '@store/AuthProvider';

const Index = ({ data }) => {
  const { addPackageToRoom, userRoomSelection } = useStore(
    (store) => ({
      addPackageToRoom: store?.addPackageToRoom,
      userRoomSelection: store?.userRoomSelection,
    }),
    shallow
  );
  const router = useRouter();

  const onPackageSelect = (item) => {
    addPackageToRoom(router?.query?.roomId || '', item);
    router?.push('/quiz/order-summary');
  };
  const { session } = useSession();

  return (
    <>
      <Head>
        <title key="title">Interior Design Package | {company.product}</title>
        <meta
          key="description"
          name="description"
          content="Choose an interior design package that perfectly suits your budget, style & design needs from our custom-made Delight, Bliss, and Euphoria packages."
        />
      </Head>
      <div className="grid grid-cols-1 gap-4">
        <div className="-mx-4">
          <div className="p-12 rounded-lg bg-[#FFF8F5]">
            <h2 className="mb-3 homepage-section_headings font-semibold">
              <span className="text-[#EE2F70]">Select a package</span>

              <span>&nbsp;for your room</span>
            </h2>
          </div>
        </div>

        <div className="pl-16" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:mt-12">
        {data?.map((item) => {
          return (
            <div className="p-8 bg-cover rounded-xl bg-card-texture" key={item?.name}>
              <h2 className="capitalize text-2xl">{item?.name}</h2>
              <p className="my-4">
                <span className="text-2xl font-bold">${item?.salePrice?.value}</span>
                <span className="text-lg font-bold ml-2 line-through text-gray-400">${item?.price?.value}</span>
                <span className="text-lg font-bold ml-2 text-gray-400">/ Room</span>
              </p>
              <div className="leading-10">
                {item?.features?.slice(0, 4)?.map((feature) => {
                  return (
                    <p className="flex items-center" key={feature?._id}>
                      <CheckIcon className="h-6 w-6 text-[#6AC18E]" />
                      <span className="ml-2 font-bold">{feature?.label}</span>
                    </p>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <button
                  className="bg-gray-900 text-white w-56 py-4 px-4 rounded-xl text-lg font-semibold"
                  onClick={() => {
                    onPackageSelect(item);
                    PushEvent({
                      category: 'Quiz',
                      label: `Package Selected ${item?.name} | ${session?.user ? session?.user?.email : 'Guest'}`,
                      action: 'Go to Next quiz from package select to room summary'
                    });
                  }}
                >
                  Select Package
                </button>
                <div className="mt-4">
                  <PricingModal
                    pricingData={data}
                    selectBtn
                    onCloseCb={onPackageSelect}
                    btnName={'View Package Details'}
                    session={session}
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
