import CustomerStoriesNav from '@components/Shared/CustomerStoriesNav';
import ShopCategories from '@components/Shared/ShopCategories';
import { ChevronDownIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import shallow from 'zustand/shallow';
import SubNav from '../SubNav';
import UserNav from './UserNav';

const Header: React.FC = () => {
  const router = useRouter();

  const [subNavContent, setSubNavContent] = useState('stories');

  const isSubNavHover = useMemo(() => {
    return subNavContent === 'shop' ? true : false;
  }, [subNavContent]);

  const [isOpenSubNav, setIsOpenSubNav] = useState(false);
  const toggleSubNav = () => setIsOpenSubNav((prevState) => !prevState);

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
          return 'Shop By Category';
        default:
          return null;
      }
    }
  }, [subNavContent]);

  return (
    <>
      <a
        className="text-sm py-2 px-5 bg-gray-50 rounded-lg absolute top-1 left-1 focus:z-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
        href="#main"
      >
        Skip to content
      </a>
      <header className={`bg-white sticky top-0 z-50`}>
        <div className="container px-4 mx-auto">
          <div className="h-20 flex items-center">
            <Link href="/">
              <a
                className="focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none inline-block rounded-md pr-1 mr-10"
                aria-label="logo"
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
                <ul className="h-full flex items-center">
                  <li className="inline-block">
                    <Link href="/room-select">
                      <a
                        className={`text-sm py-1 px-2.5 hover:text-red-500 rounded-md focus:ring-1 focus:ring-gray-900 focus:outline-none ${
                          router.asPath === '/interior-designs' ? 'text-red-600' : 'text-gray-900'
                        }`}
                      >
                        Design Your Space
                      </a>
                    </Link>
                  </li>
                  <li className="inline-block">
                    <Link href="https://www.spacejoy.com/online-interior-design">
                      <a
                        className={`text-sm py-1 px-2.5 hover:text-red-500 rounded-md focus:ring-1 focus:ring-gray-900 focus:outline-none ${
                          router.asPath === '/pricing' ? 'text-red-600' : 'text-gray-900'
                        }`}
                        target="_blank"
                      >
                        Hire a Designer
                      </a>
                    </Link>
                  </li>
                  <li
                    className="flex h-full items-center"
                    onClick={() => {
                      toggleSubNav();
                      setSubNavContent('shop');
                    }}
                  >
                    <button
                      type="button"
                      className={`hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md focus:ring-1 focus:ring-gray-900 focus:outline-none ${
                        isOpenSubNav && subNavContent === 'shop' ? 'text-red-500' : 'text-gray-700'
                      }`}
                    >
                      Shop{' '}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform delay-75 duration-300 ease-in-out transform ${
                          isOpenSubNav && subNavContent === 'shop' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li>
                  <li className="flex">
                    <button
                      type="button"
                      className={`hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md focus:ring-1 focus:ring-gray-900 focus:outline-none ${
                        isOpenSubNav && subNavContent === 'stories' ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        toggleSubNav();
                        setSubNavContent('stories');
                      }}
                    >
                      Explore Ideas{' '}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform delay-75 duration-300 ease-in-out transform ${
                          isOpenSubNav && subNavContent === 'stories' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-2/5 text-right">
              <Link href="/search">
                <a
                  className={`text-gray-700 text-xs py-1 px-2 mx-2 rounded-lg border hover:shadow-xl hover:border-gray-200 focus:ring-1 focus:ring-gray-900 focus:outline-none ${
                    router.asPath === '/search' ? 'border-gray-200 text-red-600' : 'border-transparent'
                  }`}
                >
                  <span className="sr-only">Search</span>
                  <SearchIcon className="inline h-4 w-4" />
                </a>
              </Link>
              <Link href="/cart">
                <a className="text-gray-700 text-xs py-1 px-2 mx-2 rounded-lg border border-transparent hover:shadow-xl hover:border-gray-200 focus:ring-1 focus:ring-gray-900 focus:outline-none relative ">
                  <span className="sr-only">Shopping</span>
                  <ShoppingBagIcon className="inline h-4 w-4" />
                  {cart?.count && cart?.count > 0 ? (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                      {cart?.count || 0}
                    </span>
                  ) : null}
                </a>
              </Link>
              <Link href="/room-select">
                <a className="text-white text-xs py-1.5 px-3 mx-2 rounded-lg border border-gray-900 bg-gray-900 hover:bg-gray-700">
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
    </>
  );
};

export default Header;
