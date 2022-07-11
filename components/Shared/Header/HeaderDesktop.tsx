import CustomerStoriesNav from '@components/Shared/CustomerStoriesNav';
// import ShopCategories from '@components/Shared/ShopCategories';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { classNames, convertFilterToUrlPath } from '@utils/helpers';
import { secondaryHeaderLocations } from '@utils/Mocks/HeaderLocations';
import { menuData, navDataCategories } from '@utils/Mocks/MobileSidebar';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import shallow from 'zustand/shallow';
import { ExploreIdeasNav } from '../ExploreIdeasNav';
import { HireADesignerHeader } from '../HireADesignerHeader';
import SubNav from '../SubNav';
import UserNav from './UserNav';

const HeaderDesktop: React.FC = () => {
  const mobile = Cookies.get('isMobile');
  const router = useRouter();
  const { pathname } = router;

  const { data } = useFirebaseContext();
  const isBroadcastVisible = data?.broadcastV2?.broadcaststripVisible;
  const [selectedNavItem, setSelectedNavItem] = useState<any>([]);
  const [refSource, setRefSource] = useState<any>('');
  const [subNavContent, setSubNavContent] = useState('stories');

  const isSubNavHover = useMemo(() => {
    return subNavContent === 'shop' ? true : false;
  }, [subNavContent]);

  const formattedMenuData = useMemo(() => {
    return menuData.map((item) => {
      return {
        ...item,
        children: item?.categories,
      };
    });
  }, []);
  const formattedNavData = useMemo(() => {
    return navDataCategories.map((item) => {
      return {
        ...item,
        children: item?.categories?.map((category) => {
          return { ...category, children: category?.subCategories };
        }),
      };
    });
  }, []);

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
        // case 'shop':
        //   return <ShopCategories callback={toggleSubNav} />;
        // case 'hire a designer':
        //   return <CustomerStoriesNav />;

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
        // case 'shop':
        //   return <TabOffers />;

        case 'hire a designer':
          return <HireADesignerHeader />;

        case 'explore ideas':
          return <ExploreIdeasNav />;

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
      <header className={`bg-white sticky ${isBroadcastVisible ? 'top-10 mb-10' : 'top-0'} z-50`}>
        <div className="container px-4 mx-auto">
          <div className="hidden md:flex md:items-center h-16">
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
                  {/* <li className="inline-block">
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
                  </li> */}
                  <li
                    className="items-center h-full sm:hidden md:hidden lg:flex"
                    onClick={() => {
                      toggleSubNav();
                      setSubNavContent('hire a designer');
                    }}
                  >
                    <button
                      type="button"
                      className={`hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md  focus:outline-none ${
                        isOpenSubNav && subNavContent === 'hire a designer' ? 'text-red-500' : 'text-gray-700'
                      }`}
                    >
                      Design Your Space{' '}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform delay-75 duration-300 ease-in-out transform ${
                          isOpenSubNav && subNavContent === 'hire a designer' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li>
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
                        Shop Sets
                      </a>
                    </Link>
                  </li>
                  <li className="items-center h-full sm:hidden md:hidden lg:flex">
                    <button
                      type="button"
                      className={`hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md  focus:outline-none ${
                        pathname === '/shop-furniture-decor' ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        router.push({ pathname: '/shop-furniture-decor' });
                        PushEvent({
                          category: `Top Nav - Shop`,
                          action: `Open Shop Page`,
                          label: `Shop Button`,
                        });
                      }}
                    >
                      Shop
                    </button>
                  </li>
                  <li className="flex sm:hidden md:hidden lg:flex">
                    <button
                      type="button"
                      className={`whitespace-nowrap hover:text-red-500 text-sm py-1 px-2.5 flex items-center rounded-md  focus:outline-none ${
                        isOpenSubNav && subNavContent === 'explore ideas' ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        toggleSubNav();
                        setSubNavContent('explore ideas');
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
                          isOpenSubNav && subNavContent === 'explore ideas' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </li>
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
              {/* <Link href={`/cart${refSource ? `?ref=${refSource}` : ''}`}>
                <a className="relative px-2 py-1 mx-2 text-xs text-gray-700 border border-transparent rounded-lg hover:shadow-xl hover:border-gray-200  focus:outline-none ">
                  <span className="sr-only">Shopping</span>
                  <ShoppingBagIcon className="inline w-4 h-4" />
                  {cart?.count && cart?.count > 0 ? (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                      {cart?.count || 0}
                    </span>
                  ) : null}
                </a>
              </Link> */}
              <Link href={`/quiz/start-quiz`}>
                <a className="text-white text-xs py-1.5 px-3 mx-2 rounded-lg border border-gray-900 bg-gray-900 hover:bg-gray-700 whitespace-nowrap">
                  Start Your Project
                </a>
              </Link>
              <UserNav />
            </div>
          </div>
        </div>
        <div>
          {secondaryHeaderLocations.includes(pathname) && mobile === 'false' && (
            <div className={`hide-scrollbar w-full z-50`}>
              <div className="bg-gray-100 whitespace-nowrap hidden sm:block">
                <div className="relative container p-4 py-3 flex items-center justify-center space-x-8 text-sm text-gray-700 mx-auto">
                  <Popover.Group className="flex  flex-wrap">
                    <Link href="/shop">
                      <a>
                        <p className="hover:text-red-500 transition duration-200 px-4 py-1 leading-relaxed">
                          All Products
                        </p>
                      </a>
                    </Link>
                    {formattedNavData
                      .filter((menu) => menu.name === 'Shop')[0]
                      .children.map((category) => (
                        <Popover key={category.name}>
                          {({ open }) => (
                            <>
                              <Popover.Button
                                key={category.name}
                                className={classNames(
                                  open ? 'text-red-500 underline' : '',
                                  'group inline-flex items-center focus:outline-none focus:ring-none hover:text-red-500 transition duration-200 px-4 py-1 leading-relaxed'
                                )}
                                onClickCapture={() =>
                                  setSelectedNavItem(
                                    formattedNavData
                                      .filter((menu) => menu.name === 'Shop')[0]
                                      .children.filter((item) => item.name === category.name)
                                  )
                                }
                              >
                                <span>{category.name}</span>
                              </Popover.Button>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                              >
                                <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                                  {({ close }) => (
                                    <div className="max-w-7xl mx-auto grid px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16gap-y-6">
                                      <div>
                                        <h3 className="font-semibold text-2xl">{selectedNavItem[0]?.name}</h3>
                                        <div className="mt-2 space-y-2">
                                          <p
                                            onClick={() => {
                                              router.push(
                                                `/${convertFilterToUrlPath(selectedNavItem[0]?.name.toLowerCase())}`
                                              );
                                              close();
                                            }}
                                            className="cursor-pointer text-gray-800 hover:text-red-500 transition duration-200 w-fit underline"
                                          >
                                            Shop All {selectedNavItem[0]?.name}
                                          </p>
                                          {selectedNavItem[0]?.children.map((item) => (
                                            <p
                                              key={item._id}
                                              onClick={() => {
                                                router.push(`/${convertFilterToUrlPath(item.name.toLowerCase())}`);
                                                close();
                                              }}
                                              className="cursor-pointer text-gray-800 hover:text-red-500 transition duration-200 w-fit"
                                            >
                                              {item.name}
                                            </p>
                                          ))}
                                        </div>
                                      </div>
                                      <div />
                                      <Link href="/shop" passHref>
                                        <div className="relative col-span-2 aspect-[2/1]">
                                          <Image
                                            src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1653633631/web/homev3/Get_Ready_For_Memorial_Day_Sale-09_d135r9.jpg"
                                            alt=""
                                            layout="fill"
                                            objectFit="contain"
                                            className="cursor-pointer"
                                          />
                                        </div>
                                      </Link>
                                    </div>
                                  )}
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}
                    <Link href="/shop?discount=10%3A%3A100">
                      <a>
                        <p className="hover:text-red-500 transition duration-200 px-4 py-1 leading-relaxed">Sale</p>
                      </a>
                    </Link>
                  </Popover.Group>
                </div>
              </div>
            </div>
          )}
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
        className={`fixed ${
          isBroadcastVisible ? 'top-10' : ''
        } bg-gray-900 bg-opacity-75 inset-0 z-40 overflow-y-auto backdrop-filter backdrop-blur firefox:bg-opacity-90`}
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

export default HeaderDesktop;
