import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { PushEvent } from '@utils/analyticsLogger';

export default function MyModal({ session ,pricingData, selectBtn, btnName = '', onCloseCb = (item: any) => {} }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className="font-bold block mx-auto hover:underline">
        {btnName}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed  bg-gray-900 bg-opacity-75 inset-0 z-50 overflow-y-scroll backdrop-filter backdrop-blur firefox:bg-opacity-90"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center" aria-label="secondary">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={`fixed  inset-0`} />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden text-left text-gray-800 align-middle transition-all transform bg-gray-100 shadow-xl rounded-md divide-y h-full p-0 py-8 pb-12 lg:mt-20">
                <div className="absolute right-4 top-4 cursor-pointer" onClick={closeModal}>
                  <XIcon className="h-5 w-5" />
                </div>
                <div className=" mx-auto px-8">
                  <p className="font-bold text-gray-500 mb-8 text-center">Unlock the best version of your room here</p>
                  <Dialog.Title as="h3" className="text-3xl mb-4 text-center">
                    Online Interior Design Packages
                  </Dialog.Title>
                  <p className="text-center text-sm">
                    Pick from one of our three online interior design packages, custom-made keeping your budget, style
                    and interior design needs in mind.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 mt-12  gap-8 lg:gap-12">
                    {pricingData?.map((item, index) => {
                      return (
                        <div
                          className={`bg-white rounded-xl shadow-sm ${index === 1 && 'lg:-translate-y-5'}`}
                          key={item?.id}
                        >
                          <div className="bg-cover rounded-xl bg-card-texture p-8">
                            <h3 className="flex font-bold justify-between">
                              <span className="capitalize text-xl">{item?.name}</span>
                              <span>
                                <span>${item?.salePrice?.value}</span>
                                <span className="text-gray-500 line-through ml-2">${item?.price?.value}</span>
                              </span>
                            </h3>
                            <div className="leading-8 lg:leading-10 mt-2">
                              {item?.features?.slice(0, 4)?.map((feature) => {
                                return (
                                  <p className="flex items-center" key={feature?._id}>
                                    <CheckIcon className="h-6 w-6 text-[#6AC18E]" />
                                    <span className="ml-2 font-bold">{feature?.label}</span>
                                  </p>
                                );
                              })}
                              {selectBtn && (
                                <button
                                  className="w-full bg-gray-900 text-white rounded-md text-center mt-4"
                                  onClick={() => {
                                    onCloseCb(item);
                                    closeModal();
                                    PushEvent({
                                      category: 'Quiz',
                                      label: `Package Selected ${item?.name} | ${session?.user ? session?.user?.email : 'Guest'}`,
                                      action: 'Go to Next quiz from package select to room summary'
                                    });
                                  }}
                                >
                                  Select <span className="capitalize">{item?.name}</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="leading-8 pt-4  px-8">
                            {item?.features?.slice(5, item?.features?.length - 1)?.map((feature) => {
                              return (
                                <p className="flex items-center" key={feature?._id}>
                                  <CheckIcon className="h-6 w-6 text-[#6AC18E]" />
                                  <span className="ml-2 font-normal">{feature?.label}</span>
                                </p>
                              );
                            })}
                          </div>
                          <div className="leading-8 lg:leading-10 pt-0 px-8 pb-8">
                            {item?.excludedFeatures?.map((feature) => {
                              return (
                                <p className="flex items-center" key={feature?._id}>
                                  <XIcon className="h-6 w-6 text-[#F45E5E]" />
                                  <span className="ml-2 font-normal text-gray-300 line-through">{feature?.label}</span>
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
