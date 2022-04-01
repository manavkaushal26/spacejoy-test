import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { company, oldSpacejoyUrl } from '@utils/config';
// import { useShopFilterContext } from '@store/ShopFilterContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PushEvent } from '@utils/analyticsLogger';
import { TabOffers } from '../TabOffers';
import { HireADesignerHeader } from '../HireADesignerHeader';

export default function MobileSidebar({ data, open, setOpen }) {
  const topLevelCategories = data?.map((item)=> item?.name);
  const router = useRouter();
  // const {
  //   filters: { category = [] },
  //   updateFilter,
  // } = useShopFilterContext();
  const [currentMenus, setCurrentMenus] = useState(data);
  const [previousStack, setPreviousStack] = useState([]);
  const [activeTopLevelCategory, setActiveTopLevelCategory] = useState('');

  const renderMenuItems = (data) => {
    return data?.map((item) =>
      item?.children && item?.children.length ? (
        <div
          onClick={(e) => {
            previousStack.push(data);
            setPreviousStack(previousStack);
            setCurrentMenus(item.children);
            if(topLevelCategories.includes(item?.name)){
              setActiveTopLevelCategory(item?.name);
            }
          }}
          className="px-4 sm:px-6 flex items-center justify-between active:bg-gray-100 py-2"
        >
          {item.name}
          <span>&gt;</span>
        </div>
      ) : (
        <div className="overflow-y-scroll">
          <div
            className="px-4 sm:px-6 active:bg-gray-100 py-2"
            onClick={() => {
              router.push(`${item.verticals ? `/shop?subcategory=${item.name}` : `${item.url}`}`);
              // updateFilter(item?.verticals?.subCategory?._id, 'subCategory', ['vertical', 'page']);
              setOpen(false);
            }}
          >
            {item.name}
          </div>
        </div>
      )
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="z-50 fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        <Link href="/">
                          <a
                            className="inline-block pr-1 mr-10 rounded-md ring-0 outline-none focus:ring-0 focus:outline-none"
                            aria-label="logo"
                            onClick={() => {
                              PushEvent({
                                category: `Top Nav Mobile - Spacejoy Logo`,
                                action: `Go to Spacejoy Home Page`,
                                label: `Spacejoy Logo`,
                              });
                              setOpen(false);
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
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6 focus:outline-none" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1">
                    <div className="absolute inset-0">
                      <div className="min-h-[50vh] space-y-2" aria-hidden="true">
                        {data && (
                          <div className="w-full h-full space-y-1">
                            <>
                              {previousStack.length ? (
                                <div
                                  onClick={(e) => {
                                    const prevState = previousStack.pop();
                                    setPreviousStack(previousStack);
                                    setCurrentMenus(prevState);
                                  }}
                                  className="bg-gray-100 p-4 sm:px-6"
                                >
                                  &lt; Back
                                </div>
                              ) : null}

                              {/* Only for Shop Nav in navigation */}
                              {/* {previousStack[0]?.map(
                                (item) => */}
                                
                                {activeTopLevelCategory === 'Shop' && (
                                  <div className="pt-4 px-4 sm:px-6 space-y-6">
                                    <div>
                                      <TabOffers />
                                    </div>
                                    <div>
                                      <h3 className="text-lg">Shop By Categories</h3>
                                    </div>
                                  </div>
                                )}
                              {/* )} */}
                              {renderMenuItems(currentMenus)}
                            </>
                          </div>
                        )}
                      </div>
                      <div className="mt-16 py-4 px-4 space-y-4 border-t border-gray-200">
                        <div className="space-y-2">
                          <h3>Contact Us</h3>
                          <a href={`tel:${company.phone.support}`}>
                            <p className="mt-2">{company.phone.support}</p>
                          </a>
                          <a href={`mailto:${company.email.support}`}>
                            <p className="mt-2">{company.email.support}</p>
                          </a>
                          <a href={`mailto:${company.email.support}`}>
                            <p className="mt-2">Partner With Us</p>
                          </a>
                        </div>
                        <div className="space-y-2">
                          <h3>Support</h3>
                          <Link href="/help" passHref>
                            <p>FAQs</p>
                          </Link>
                          <Link href="/refund-policy" passHref>
                            <p>Refund Policy</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
