import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type DrawerProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({ title = '', description = '', children, isOpen, setIsOpen }: DrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog unmount={false} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex w-3/4 h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="absolute right-0 z-50 flex flex-col justify-between w-full h-full max-w-lg p-6 overflow-scroll text-left align-middle bg-white border shadow-xl border-gray-50">
              <div>
                <Dialog.Title className="text-xl font-bold text-gray-900 md:text-2xl">{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                {children}
              </div>
              <div className="self-center mt-10">
                <button onClick={() => setIsOpen(!isOpen)}>Close</button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
