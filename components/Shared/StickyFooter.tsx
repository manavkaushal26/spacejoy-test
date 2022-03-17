import { Transition } from '@headlessui/react';
import React from 'react';

const StickyFooter = ({ show, children }) => {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      show={show}
    >
      <div className="fixed w-full bottom-0  left-0 bg-white z-10 border-t-2 border-gray-300 md:hidden">{children}</div>
    </Transition>
  );
};

export default StickyFooter;
