import { ChevronRightIcon, MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { secondaryHeaderLocations } from '@utils/Mocks/HeaderLocations';
import { menuData, navDataCategories } from '@utils/Mocks/MobileSidebar';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import shallow from 'zustand/shallow';
import UserNav from '../Header/UserNav';
import MobileSidebar from './SidebarMenu';
import SidebarMenu from './SidebarMenu';

const HeaderMobile: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const router = useRouter();
  const { pathname } = router;
  const { data } = useFirebaseContext();
  const [refSource, setRefSource] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  // const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  const formattedMenuData = useMemo(() => {
    return menuData
      .filter((item) => item.active === true)
      .map((item) => {
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

  const { cart } = useStore(
    (store) => ({
      cart: store.cart,
    }),
    shallow
  );

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
      <div
        className={`mobile-navbar bg-white sticky ${
          data?.broadcastV2?.broadcaststripVisible ? 'top-10 mb-6' : 'top-0'
        } z-50`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center h-20 lg:hidden">
            <div className="flex items-center space-x-3 flex-grow">
              <MenuIcon className="w-6 h-6" onClick={() => setOpen(true)} />
              <div>
                <Link href="/">
                  <a
                    className="inline-block pr-1 mr-10 rounded-md ring-0 outline-none focus:ring-0 focus:outline-none"
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
                    />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div>
                <Link href="/search" passHref>
                  <a>
                    <span className="sr-only">Search</span>
                    <SearchIcon
                      className={`w-6 h-6 ${router.asPath === '/search' ? 'text-red-600' : 'border-transparent'}`}
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link href={`/cart${refSource ? `?ref=${refSource}` : ''}`} passHref>
                  <div className="relative cursor-pointer">
                    <ShoppingBagIcon
                      className={`w-6 h-6 ${router.asPath === '/cart' ? 'text-red-600' : 'border-transparent'}`}
                    />
                    {cart?.count && cart?.count > 0 ? (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                        {cart?.count || 0}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </div>
              <div className="flex">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        {secondaryHeaderLocations.includes(pathname) && mobile === true && (
          <>
            <div className="min-h-[40px] p-4 bg-gray-100 font-semibold" onClick={() => setCategoriesMenuOpen(true)}>
              <div className="flex items-center justify-between container px-4 mx-auto">
                <p>Shop By Categories</p>
                <span>
                  <ChevronRightIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <SidebarMenu open={open} setOpen={setOpen} data={formattedMenuData} />
      {/* For Categories Menu on Shop-Furniture-Decor */}
      <MobileSidebar
        open={categoriesMenuOpen}
        setOpen={setCategoriesMenuOpen}
        data={formattedNavData.filter((menu) => menu.name === 'Shop')[0]?.children}
      />
    </>
  );
};

export default HeaderMobile;
