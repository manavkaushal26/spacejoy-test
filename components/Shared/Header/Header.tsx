import CustomerStoriesNav from '@components/Shared/CustomerStoriesNav';
import ShopCategories from '@components/Shared/ShopCategories';
import { Dialog } from '@headlessui/react';
import { ChevronDownIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import shallow from 'zustand/shallow';
import SubNav from '../SubNav';
import { TabOffers } from '../TabOffers';
import UserNav from './UserNav';

const Header: React.FC = () => {
  const router = useRouter();

  const [refSource, setRefSource] = useState<any>('');
  const [subNavContent, setSubNavContent] = useState('stories');

  const isSubNavHover = useMemo(() => {
    return subNavContent === 'shop' ? true : false;
  }, [subNavContent]);

  const [isOpenSubNav, setIsOpenSubNav] = useState(false);
  const toggleSubNav = () => setIsOpenSubNav((prevState) => !prevState);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleMenu = () => setIsOpenMenu((prevState) => !prevState);

  const handleHover = (value) => {
    setIsOpenSubNav(value);
  };

  const { cart } = useStore(
    (store) => ({
      cart: store.cart,
    }),
    shallow
  );

  const getSubNavContent = useCallback(() => {
    if (!subNavContent) {
      return null;
    } else {
      switch (subNavContent) {
        case 'stories':
          return <CustomerStoriesNav />;
        case 'shop':
          return <ShopCategories callback={toggleSubNav} />;

        default:
          return null;
      }
    }
  }, [subNavContent]);

  const getSubNavHeader = useCallback(() => {
    if (!subNavContent) {
      return null;
    } else {
      switch (subNavContent) {
        case 'stories':
          return 'Explore';
        case 'shop':
          return <TabOffers />;
        default:
          return null;
      }
    }
  }, [subNavContent]);

  useEffect(() => {
    const {
      query: { ref = '' },
    } = router;
    if (ref) {
      setRefSource(ref);
    }
  }, [router]);

  return (
    <>
      <header className={`bg-white sticky top-0 z-50`}>
        <div className="container px-4 mx-auto overflow-hidden">
          <div className="lg:flex lg:items-center h-20 hidden">
            <Link href="/">
              <a
                className="inline-flex pr-1 mr-10 rounded-md focus:outline-none"
                aria-label="logo"
                onClick={() => {
                  PushEvent({
                    category: `Top Nav - Spacejoy Logo`,
                    action: `Go to Spacejoy Home Page`,
                    label: `Spacejoy Logo`,
                  });
                }}
              >
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_200/v1578101355/shared/spacejoy-logo_ase39m.svg"
                  width={125}
                  height={25}
                  alt="Spacejoy Logo"
                  className="Logo__ImageStyled-sc-po3q2y-0 iZTGUF"
                />
              </a>
            </Link>
            <div className="flex-1 h-full">
              <nav aria-label="Primary" className="h-full">
                <ul className="flex items-center h-full">
                  <li className="inline-block">
                    <Link href="/room-select">
                      <a
                        className={`whitespace-nowrap text-sm py-1 px-2.5 hover:text-red-500 rounded-md  focus:outline-none ${
                          router.asPath === '/room-select' ? 'text-red-600' : 'text-gray-900'
                        }`}
                        onClick={() => {
                          PushEvent({
                            category: `Top Nav - Design your Space`,
                            action: `Go to Room Select Page`,
                            label: `Design your Space`,
                          });
                        }}
                      >
                        Design Your Space
                      </a>
                    </Link>
                  </li>
                  <li className="inline-block">
                    <Link href={`${oldSpacejoyUrl}/online-interior-design`}>
                      <a
                        className={`whitespace-nowrap text-sm py-1 px-2.5 hover:text-red-500 rounded-md  focus:outline-none ${
                          router.asPath === '/online-interior-design' ? 'text-red-600' : 'text-gray-900'
                        }`}
                        target="_blank"
                        onClick={() => {
                          PushEvent({
                            category: `Top Nav - Hire a Designer`,
                            action: `Go to Online Interior Design Page`,
                            label: `Hire a Designer`,
                          });
                        }}
                      >
                        Hire a Designer
                      </a>
                    </Link>
                  </li>
                  <li
                    className="items-center h-full sm:hidden md:hidden lg:flex"
                    onClick={() => {
                      toggleSubNav();
                      setSubNavContent('shop');
                    }}
                  >
                    <button
                      type="button"
                      className={`hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md  focus:outline-none ${
                        isOpenSubNav && subNavContent === 'shop' ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        PushEvent({
                          category: `Top Nav - Shop`,
                          action: `Open Shop Dropdown`,
                          label: `Shop Button`,
                        });
                      }}
                    >
                      Shop{' '}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform delay-75 duration-300 ease-in-out transform ${
                          isOpenSubNav && subNavContent === 'shop' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li>
                  {/* <li className="flex sm:hidden md:hidden lg:flex">
                    <button
                      type="button"
                      className={`whitespace-nowrap hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md  focus:outline-none ${
                        isOpenSubNav && subNavContent === 'stories' ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        toggleSubNav();
                        setSubNavContent('stories');
                        PushEvent({
                          category: `Top Nav - Explore Ideas`,
                          action: `Open Explore Ideas Dropdown`,
                          label: `Explore Ideas`,
                        });
                      }}
                    >
                      Explore Ideas{' '}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform delay-75 duration-300 ease-in-out transform ${
                          isOpenSubNav && subNavContent === 'stories' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li> */}
                  <li
                    className="text-sm sm:inline-block md:inline-block lg:hidden cursor-pointer"
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    More
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-2/5 md:flex md:items-center md:justify-center lg:justify-end">
              <Link href="/search">
                <a
                  className={`text-gray-700 text-xs py-1 px-2 mx-2 rounded-lg border hover:shadow-xl hover:border-gray-200  focus:outline-none ${
                    router.asPath === '/search' ? 'border-gray-200 text-red-600' : 'border-transparent'
                  }`}
                >
                  <span className="sr-only">Search</span>
                  <SearchIcon className="inline w-4 h-4" />
                </a>
              </Link>
              <Link href={`/cart${refSource ? `?ref=${refSource}` : ''}`}>
                <a className="relative px-2 py-1 mx-2 text-xs text-gray-700 border border-transparent rounded-lg hover:shadow-xl hover:border-gray-200  focus:outline-none ">
                  <span className="sr-only">Shopping</span>
                  <ShoppingBagIcon className="inline w-4 h-4" />
                  {cart?.count && cart?.count > 0 ? (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                      {cart?.count || 0}
                    </span>
                  ) : null}
                </a>
              </Link>
              <Link href="/room-select">
                <a className="text-white text-xs py-1.5 px-3 mx-2 rounded-lg border border-gray-900 bg-gray-900 hover:bg-gray-700 whitespace-nowrap">
                  Design Your Space
                </a>
              </Link>
              <UserNav />
            </div>
          </div>
        </div>
      </header>
      <SubNav
        subNavState={isOpenSubNav}
        closeSubNav={toggleSubNav}
        updateNavStatus={handleHover}
        hoverNav={isSubNavHover}
      >
        <SubNav.Header>{getSubNavHeader()}</SubNav.Header>
        <SubNav.Body>{getSubNavContent()}</SubNav.Body>
      </SubNav>

      <Dialog
        open={isOpenMenu}
        onClose={() => setIsOpenMenu(false)}
        as="div"
        className="fixed bg-gray-900 bg-opacity-75 inset-0 z-40 overflow-y-auto backdrop-filter backdrop-blur firefox:bg-opacity-90"
      >
        <Dialog.Overlay />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl absolute top-10 left-1/3">
          <Dialog.Title>More Options</Dialog.Title>
          <ul>
            <li
              className="cursor-pointer"
              onClick={() => {
                setIsOpenMenu(false);
                toggleSubNav();
                setSubNavContent('shop');
              }}
            >
              Shop
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                setIsOpenMenu(false);
                toggleSubNav();
                setSubNavContent('stories');
              }}
            >
              Explore Ideas
            </li>
          </ul>
        </div>
      </Dialog>
    </>
  );
};

export default Header;
