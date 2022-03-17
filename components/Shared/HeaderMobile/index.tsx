import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PushEvent } from '@utils/analyticsLogger';
import { MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import { useStore } from '@lib/store';
import SidebarMenu from './SidebarMenu';
import { oldSpacejoyUrl } from '@utils/config';
import UserNav from '../Header/UserNav';
import { splitCategories } from '@utils/Mocks/SplitCategoriesData';

const menuData = [
  {
    name: 'Design Your Space',
    url: '/room-select',
  },
  {
    name: 'Hire a Designer',
    url: `${oldSpacejoyUrl}/online-interior-design`,
  },
  {
    name: 'Shop',
    title: 'Category',
    categories: splitCategories,
  },
];

const HeaderMobile: React.FC = () => {
  const router = useRouter();
  const [refSource, setRefSource] = useState<any>('');
  const [open, setOpen] = useState(false);

  const formattedMenuData = useMemo(() => {
    return menuData.map((item) => {
      return {
        ...item,
        children: item?.categories?.map((category) => {
          return { ...category, children: category.subCategories };
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
      <div className={`bg-white sticky top-0 z-50`}>
        <div className="container px-4 mx-auto overflow-hidden">
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
        <SidebarMenu open={open} setOpen={setOpen} data={formattedMenuData} />
      </div>
    </>
  );
};

export default HeaderMobile;
