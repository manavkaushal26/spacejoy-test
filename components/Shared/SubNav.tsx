import { Dialog, Transition } from '@headlessui/react';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import React, { Fragment } from 'react';

interface StaticComponents {
  Body?: React.FC;
  Button?: React.FC;
  Header?: React.FC;
}
interface ModalProps {
  subNavState: boolean;
  closeSubNav: () => void;
  onCloseCallback?: () => void;
  hoverNav?: boolean;
  updateNavStatus?: (boolean) => void;
}
const SubNav: React.FC<ModalProps> & StaticComponents = ({
  children,
  subNavState,
  closeSubNav,
  onCloseCallback,
  hoverNav,
  updateNavStatus,
}) => {
  const { data } = useFirebaseContext();
  const isBroadcastVisible = data?.broadcastV2?.broadcaststripVisible;

  return (
    <Transition appear show={subNavState} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed ${isBroadcastVisible ? 'top-10' : ''} bg-gray-900 bg-opacity-75 inset-0 z-40 overflow-y-auto backdrop-filter backdrop-blur firefox:bg-opacity-90`}
        onClose={() => {
          closeSubNav();
          onCloseCallback && onCloseCallback();
        }}
      >
        <div
          className="min-h-screen text-center"
          aria-label="secondary"
          onMouseEnter={() => hoverNav && updateNavStatus(true)}
          onMouseLeave={() => hoverNav && updateNavStatus(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={`fixed ${isBroadcastVisible ? 'top-10 mb-10' : ''} inset-0`} />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="opacity-0  -translate-y-60"
            enterTo={`opacity-100 ${isBroadcastVisible ? 'translate-y-10' : 'translate-y-0'}`}
            leave="transition ease-in-out duration-300 transform"
            leaveFrom={`opacity-100 ${isBroadcastVisible ? 'translate-y-10' : 'translate-y-0'}`}
            leaveTo="opacity-0 -translate-y-60"
          >
            <div className="container mx-auto overflow-hidden relative pt-24 pb-4 text-left bg-white shadow-xl rounded-b-lg">
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
