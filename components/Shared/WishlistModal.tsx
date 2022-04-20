import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface StaticComponents {
  Body?: React.FC;
  Button?: React.FC;
  Header?: React.FC;
}
interface ModalProps {
  isOpen: boolean;
  closeModal: (boolean) => void;
}
const SubNav: React.FC<ModalProps> & StaticComponents = ({ children, isOpen, closeModal }) => {
  return (
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
            <div className=" inline-block w-full max-w-md  overflow-hidden text-left text-gray-800 align-middle transition-all transform bg-white shadow-xl rounded-md divide-y w-full h-full lg:w-8/12 min-w-65 py-4">
              <div className="container mx-auto px-8">
                <Dialog.Title as="h3" className="text-3xl mb-6">
                  {children[0]}
                </Dialog.Title>
                <div>{children[1]}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
SubNav.Button = ({ children }) => <>{children}</>;
SubNav.Header = ({ children }) => <>{children}</>;
SubNav.Body = ({ children }) => <>{children}</>;

export default SubNav;
