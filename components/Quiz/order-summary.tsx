import EmptyState from '@components/Shared/EmptyState';
import { PencilAltIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/offerStore';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary, company, imageKit } from '@utils/config';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import shallow from 'zustand/shallow';
import { useSession } from '@store/AuthProvider';
import { PushEvent } from '@utils/analyticsLogger';

const Index = () => {
  const { userRoomSelection, deleteRoom, getUserSelectionData } = useStore(
    (store) => ({
      userRoomSelection: store?.userRoomSelection,
      deleteRoom: store?.deleteRoom,
      getUserSelectionData: store?.getUserSelectionData,
    }),
    shallow
  );
  const router = useRouter();

  const { query: { redirect = '' } = {} } = router;

  const submitCart = async () => {
    const payload = getUserSelectionData();
    await fetcher({ endPoint: '/v1/subscriptionCarts', body: payload, method: 'POST' });
    router.push({ pathname: '/design-cart' });
  };

  return (
    <>
      <Head>
        <title key="title">Oder Summary | {company.product}</title>
        <meta
          key="description"
          name="description"
          content=" Find your order summary here with details of the selected room and package, details of order placed for furniture and décor pieces, and delivery status."
        />
      </Head>
      <div className="grid grid-cols-1 gap-4">
        <div className="-mx-4">
          <div className="p-12 rounded-lg bg-[#FFF8F5]">
            <h2 className="mb-3 font-semibold homepage-section_headings">
              <span className="text-[#EE2F70]">Great!</span>

              <span>&nbsp;you can continue to add more rooms here</span>
            </h2>
          </div>
        </div>

        <div className="">
          {redirect && (
            <div className="flex justify-end font-bold text-[#EE2F70] mb-8 cursor-pointer" onClick={submitCart}>
              Checkout
            </div>
          )}
          {userRoomSelection?.length ? (
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {userRoomSelection?.map((item, index) => {
                return (
                  <div
                    className={`p-4 pl-8 rounded-lg bg-[#FFF8F5] border border-[#FFF8F5] cursor-pointer flex items-center `}
                    key={`${item?._id}-${index}`}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full hover:shadow-md"
                      onClick={() => deleteRoom(item?.itemId)}
                    >
                      <TrashIcon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="ml-4 text-xl lg:text-xl xl:text-2xl">
                      <p className="capitalize">{item?.displayName}</p>
                      <p className="flex items-center text-sm">
                        <span className="hidden text-lg md:block">Package Name:</span>
                        <span className="inline-block md:hidden text-md">Package:</span>
                        <span className="ml-1 font-bold capitalize text-md md:text-lg">
                          {item?.packageSelection?.name}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center ml-auto">
                      <div className="hidden  md:block">
                        <Link
                          passHref
                          href={{
                            query: { roomId: item?.itemId },
                            pathname: '/quiz/select-package',
                          }}
                        >
                          {/* <div className="mr-4 text-sm text-[#EE2F70] font-bold inline-block md:hidden">
                            <PencilAltIcon className="text-[#EE2F70] h-4 w-4" />
                          </div> */}
                          <p className="text-sm font-bold cursor-pointer text-[#EE2F70] mr-8 hover:underline text-md md:text-lg">
                            Edit Package
                          </p>
                        </Link>
                      </div>
                      <div className="block md:hidden ">
                        <Link
                          passHref
                          href={{
                            query: { roomId: item?.itemId },
                            pathname: '/quiz/select-package',
                          }}
                        >
                          <div className="mr-4 text-sm text-[#EE2F70] font-bold inline-block md:hidden">
                            <PencilAltIcon className="text-[#EE2F70] h-4 w-4" />
                          </div>
                        </Link>
                      </div>

                      <div className="relative w-20 h-20">
                        <Image
                          src={`${imageKit.baseDeliveryUrl}/${item?.cdnThumbnail}`}
                          alt={item?.name}
                          placeholder="blur"
                          blurDataURL={blurredBgImage}
                          // height="60"
                          // width="60"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <EmptyState
                title="You have not added any rooms"
                message="Please add a room to proceed"
                showButton={false}
              />
            </>
          )}

          <div className="mt-8">
            <Link href="/quiz/room-select" passHref>
              <button
                onClick={() =>
                  PushEvent({
                    category: 'Quiz',
                    label: 'Add Another Room',
                    action: 'Go from order summary to room select room',
                  })
                }
                className="flex items-center w-full px-12 py-6 text-xl text-gray-900 bg-gray-300 rounded-lg justify center lg:w-auto"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="ml-2">Add another room</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8" />
    </>
  );
};

export default React.memo(Index);
