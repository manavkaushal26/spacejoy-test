import LoginManager from '@components/Shared/LoginManager';
import WishListModal from '@components/Shared/WishlistModal';
import { ArrowLeftIcon, CheckCircleIcon, HeartIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/solid';
import { blurredBgImage } from '@public/images/bg-base-64';
import { useSession } from '@store/AuthProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import topCollages, { defaultImgSrcThumbnail } from '@utils/Mocks/DefaultFavourites';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SVGLoader from './SVGLoader';
export const fetchWishList = async () => {
  try {
    const endPoint = '/v1/wishlist';
    const { data, statusCode } = await fetcher({ endPoint, method: 'GET' });
    if (statusCode <= 301) {
      return [data, null];
      // setUserWishlist([...data, ...userWishlist]);
    } else {
      throw new Error();
    }
  } catch (e) {
    return [null, e.message];
  } finally {
  }
};

const fetchWishlistMappedToProduct = async (documentId) => {
  try {
    const endPoint = `/v1/wishlist-items/item/${documentId}`;
    const { data, statusCode } = await fetcher({ endPoint, method: 'GET' });

    if (statusCode <= 301) {
      return [data, null];
    } else {
      throw new Error();
    }
  } catch (e) {
    return [null, e.message];
  } finally {
  }
};

const WishListBtn = ({ outline = true, selected = false, type = 'Asset', documentId = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isUserAuthenticated = Cookies.get('token') ? true : false;
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [userWishlist, setUserWishlist] = useState([...topCollages?.list]);
  const [loading, setLoading] = useState(false);

  const [newWishlistName, setNewWishlistName] = useState('');
  const [wishlistsMappedToDocument, setWishlists] = useState([]);

  const [isWishlisted, setWishlisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const {
      query: { addToFavourites = 'false' },
    } = router;

    if (isUserAuthenticated && addToFavourites === 'true') {
      setIsOpen(true);

      if (router?.query?.addToFavourites) {
        const currentQuery = { ...router?.query };
        delete currentQuery.addToFavourites;
        router.push(
          {
            query: { ...currentQuery },
            pathname: router?.pathname,
          },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [isUserAuthenticated, router]);

  useEffect(() => {
    setWishlisted(selected);
  }, [selected]);

  const goBack = () => {
    const newStepNumber = currentStepNumber === 0 ? currentStepNumber : currentStepNumber - 1;
    setCurrentStepNumber(newStepNumber);
  };
  const { session } = useSession();
  useEffect(() => {
    if (wishlistsMappedToDocument && wishlistsMappedToDocument?.length) {
      //updated selected status of wishlists
      const selectedIds = wishlistsMappedToDocument?.map((item) => {
        return item?.id;
      });

      const updatedUserWishlist = userWishlist.map((wishlist) => {
        if (selectedIds?.indexOf(wishlist?._id) > -1) {
          return { ...wishlist, selected: true };
        }

        return { ...wishlist, selected: false };
      });

      setUserWishlist(updatedUserWishlist);
    }
  }, [wishlistsMappedToDocument]);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        setLoading(true);
        const [data = [], error] = await fetchWishList();

        const test = topCollages?.list?.filter((item) => {
          return !data?.some((wl) => wl.name === item.name);
        });

        if (data) {
          setUserWishlist([...data, ...test]);
        }
        PushEvent({
          category: `Wishlist Button Clicked`,
          action: `Wishlist Btn Clicked for ${type} - for id ${documentId}`,
          label: `Adding ${type} to Wishlist`,
        });
        const [wishlists, err] = await fetchWishlistMappedToProduct(documentId);

        if (wishlists) {
          setWishlists(wishlists?.wishlists);
        }
        setLoading(false);
      })();
    }
  }, [isOpen]);

  const addToWishlistSuccess = () => {
    setWishlisted(true);
    setNewWishlistName('');
    setCurrentStepNumber(0);
  };

  const createNewWishListAndAddItem = async (wishlistName) => {
    try {
      // create new wishlist with name
      const endPoint = '/v1/wishlist';
      const { data, statusCode } = await fetcher({
        endPoint,
        method: 'POST',
        body: {
          name: wishlistName,
        },
      });
      PushEvent({
        category: `New Wishlist created`,
        action: ` ${wishlistName} created | user ${session?.user?.name}`,
        label: `New Wishlist created`,
      });

      if (statusCode <= 301) {
        // add item to wishlist
        const { _id: recentWishlistId = '' } = data;
        const { statusCode: status, data: savedItemData } = await fetcher({
          endPoint: '/v1/wishlist-items',
          method: 'POST',
          body: {
            wishlist: recentWishlistId,
            type,
            documentId,
          },
        });
        PushEvent({
          category: `Item added to new wishlist`,
          action: ` item added to  ${wishlistName} with ${recentWishlistId}  | user ${session?.user?.name}`,
          label: `Item added to New Wishlist`,
        });
        // fetch updated list of wishlist
        const [res, error] = await fetchWishList();
        if (res) {
          const filteredList = topCollages?.list?.filter(
            (item) => !res.some((wl) => wl.name.toLowerCase() === item?.name.toLocaleLowerCase())
          );

          const consolidatedArray = [...res, ...filteredList];

          setUserWishlist(consolidatedArray);
        }
        addToWishlistSuccess();
        toast.success('Success! item added to wishlist');
      } else {
        throw new Error();
      }
    } catch (e) {
    } finally {
    }
  };

  const [selectedWlName, setName] = useState('');
  const addToExistingWishList = async (wishlistObject) => {
    const { isDefault = false, _id, selected, name = '' } = wishlistObject;

    setLoading(true);
    setName(name);

    if (!selected) {
      if (isDefault) {
        await createNewWishListAndAddItem(wishlistObject?.name || '');
      } else {
        const { statusCode: status, data: savedItemData } = await fetcher({
          endPoint: '/v1/wishlist-items',
          method: 'POST',
          body: {
            wishlist: _id,
            type,
            documentId,
          },
        });
        PushEvent({
          category: `Item added to wishlist`,
          action: ` item added to ${_id}  | user ${session?.user?.name}`,
          label: `Item added to Wishlist`,
        });
        addToWishlistSuccess();
        const [wishlists, err] = await fetchWishlistMappedToProduct(documentId);
        if (wishlists) {
          setWishlists(wishlists?.wishlists);
        }
        toast.success('Success! item added to wishlist');
      }
    } else {
      // remove from wishlist
      await fetcher({
        endPoint: `/v1/wishlist-items/${_id}/${documentId}`,
        method: 'DELETE',
      });
      const [wishlists, err] = await fetchWishlistMappedToProduct(documentId);

      if (wishlists) {
        setWishlists(wishlists?.wishlists);
      }
      toast.success('Success! item removed from wishlist');
      PushEvent({
        category: `Item removed from wishlist`,
        action: `${type} removed from wishlist ${_id}`,
        label: `Remove from wishlist`,
      });
    }

    setLoading(false);
  };

  const onClick = () => {
    router.push(
      {
        query: { ...router?.query, addToFavourites: true },
        pathname: router?.pathname,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      {isUserAuthenticated ? (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className={`px-4 py-3 text-base font-medium text-white bg-white shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none ${
            outline ? 'border border-gray-900' : ''
          }`}
        >
          {isWishlisted ? (
            <SolidHeart className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-900" />
          )}
        </button>
      ) : (
        <LoginManager
          ctaText={<HeartIcon className="h-6 w-6 text-gray-900" />}
          redirect="addToFavourites"
          onClick={onClick}
        />
      )}

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
            {currentStepNumber >= 1 ? (
              <button onClick={goBack}>
                <ArrowLeftIcon className="h-4 w-4 text-gray-500" />
              </button>
            ) : null}
            <div className="flex items-center">
              <SolidHeart className="h-6 w-6 text-red-500" />
              <h2 className="ml-2">My Rooms</h2>
            </div>
            <div className="mt-4 text-sm">
              <span className="font-bold"> Note:</span>
              <span className="ml-2">
                Rooms are saved on your{' '}
                <Link href="/wishlist" passHref>
                  <span className="underline cursor-pointer">dashboard</span>
                </Link>
              </span>
            </div>
            {currentStepNumber !== 1 ? (
              <div className="mt-2 flex items-center cursor-pointer" onClick={() => setCurrentStepNumber(1)}>
                <button className="px-5 py-4 text-base font-medium text-white bg-gray-300 shadow-xs group hover:shadow-md rounded-lg focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none ">
                  <PlusIcon className="h-6 w-6 text-gray-500" />
                </button>
                <span className="ml-4">Create a new room</span>
              </div>
            ) : null}

            <div className="my-4 bg-gray-300 p-2 rounded-lg" />
            <div>
              {currentStepNumber === 0 ? (
                <ul className="overflow-scroll pb-16">
                  {userWishlist?.map((room, index) => (
                    <button key={`index-${room?.name}-${room?._id || index}`} className="w-full">
                      <li
                        className={`flex h-full items-center relative ${index > 0 ? 'mt-4' : ''}`}
                        onClick={() => addToExistingWishList(room)}
                      >
                        <div className="px-10 py-10 relative rounded-lg">
                          <Image
                            // src={`${cloudinary.baseDeliveryURL}/${room?.cdnThumbnail || room?.thumbnail}`}

                            src={
                              room?.thumbnail
                                ? `${cloudinary.baseDeliveryURL}/${room?.thumbnail}`
                                : defaultImgSrcThumbnail
                            }
                            className="object-cover object-center w-full h-full rounded-lg"
                            layout="fill"
                            placeholder="blur"
                            blurDataURL={blurredBgImage}
                            alt={room?.name}
                          />
                        </div>
                        <span className="ml-4 font-bold">{`${room?.name}`}</span>
                        {room?.selected && !loading && (
                          <CheckCircleIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5" />
                        )}
                        {loading && room?.name === selectedWlName && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5">
                            <SVGLoader />
                          </span>
                        )}
                      </li>
                    </button>
                  ))}
                </ul>
              ) : (
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
                    onClick={() => createNewWishListAndAddItem(newWishlistName)}
                  >
                    Create &amp; save
                  </button>
                </div>
              )}
            </div>
          </div>
        </WishListModal.Body>
      </WishListModal>
    </>
  );
};

export default WishListBtn;
