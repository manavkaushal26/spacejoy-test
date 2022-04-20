import WishListModal from '@components/Shared/WishlistModal';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/solid';
import { PushEvent } from '@utils/analyticsLogger';
import fetcher from '@utils/fetcher';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CreateBtn = ({ open = false, cb = () => {} }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [newWishlistName, setNewWishlistName] = useState('');

  const createNewList = async (listName: string) => {
    try {
      // create new wishlist with name
      const endPoint = '/v1/wishlist';
      const { data, statusCode } = await fetcher({
        endPoint,
        method: 'POST',
        body: {
          name: listName,
        },
      });
      if (statusCode < 301) {
        toast.success('Room Created');
        cb();
        setIsOpen(false);
        setNewWishlistName('');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    }
  };
  useEffect(() => {
    if (isOpen) {
      PushEvent({
        category: `Create Room Button Clicked`,
        action: `Create Room Button Clicked`,
        label: `Create Room Button Clicked | Wishlist listing page`,
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        className=" w-full md:w-auto p-0 md:px-12 py-3 text-center text-base font-medium text-gray-900 bg-gray-300 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="ml-2">Create New Wishlist</span>
      </button>
      <WishListModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <WishListModal.Header>
          <div className="flex justify-between items-center">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_200/v1578101355/shared/spacejoy-logo_ase39m.svg"
              width={125}
              height={25}
              alt="Spacejoy Logo"
              className="Logo__ImageStyled-sc-po3q2y-0 iZTGUF"
            />
            <button onClick={() => setIsOpen(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </WishListModal.Header>
        <WishListModal.Body>
          <div>
            <div className="flex items-center">
              <SolidHeart className="h-6 w-6 text-red-500" />
              <h2 className="ml-2">My Rooms</h2>
            </div>
            <div className="mt-4 text-sm">
              <span className="font-bold"> Note:</span>
              <span className="ml-2">
                Rooms are saved on your{' '}
                <Link href="/wishlist" passHref>
                  <span className="underline">dashboard</span>
                </Link>
              </span>
            </div>

            <div className="my-4 bg-gray-300 p-2 rounded-lg" />
            <div>
              <div className="text-center">
                <div className="flex">
                  <button
                    className="px-3 py-2 text-base font-medium text-white bg-gray-200 shadow-xs group hover:shadow-md rounded-lg focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none "
                    disabled
                  >
                    <Image
                      className=""
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1649417086/web/icons/Path_9_boxyrv.svg"
                      height="40"
                      width="40"
                      alt="spacejoy logo"
                    />
                  </button>
                  <input
                    type="text"
                    className="p-2 border border-gray-900 text-sm w-full ml-4"
                    placeholder="Enter your wishlist name"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e?.target?.value)}
                  />
                </div>

                <button
                  className={`px-4 mt-4 py-2 rounded-md ${
                    newWishlistName.length
                      ? 'bg-gray-900 text-white pointer-events-auto'
                      : 'bg-gray-200 text-white pointer-events-none'
                  }`}
                  onClick={async () => await createNewList(newWishlistName)}
                >
                  Create &amp; save
                </button>
              </div>
            </div>
          </div>
        </WishListModal.Body>
      </WishListModal>
    </>
  );
};

export default CreateBtn;
