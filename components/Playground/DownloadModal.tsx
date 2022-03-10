import { Dialog, Transition } from '@headlessui/react';
import { DownloadIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import React, { Fragment, useContext, useRef, useState } from 'react';
import UnitAction from './UnitAction';
import { SelectedIdContext } from '@store/SelectedId';

interface DownloadModalProps {
  onOk: (value: { name: string; email: string; collageName: string }) => void;
  designSetId: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ onOk, designSetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useContext(SelectedIdContext);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setSelectedId(null);
    PushEvent({
      category: `Click on Download`,
      action: `Open Download Modal | ${designSetId}`,
      label: 'Download Design',
    });
    setIsOpen(true);
  }
  const formRef = useRef<HTMLFormElement>();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nameEl = formRef.current.elements['name'];
    const emailEl = formRef.current.elements['email'];
    const collageNameEl = formRef.current.elements['collage name'];
    const name = nameEl.value;
    const email = emailEl.value;
    const collageName = collageNameEl.value;
    if (onOk) onOk({ name, email, collageName });
    closeModal();
  };

  return (
    <>
      <UnitAction position="bottom" id="download" title="Download design as an image" onClick={openModal}>
        <DownloadIcon className="w-4 h-4" /> <span className="ml-2 mr-px text-sm">Download</span>
      </UnitAction>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="absolute inset-0 z-10 w-1/2 -translate-x-1 -translate-y-2 bg-spj-yellow rounded-2xl" />
                <div className="absolute inset-0 z-10 translate-x-1 translate-y-1 bg-spj-red rounded-2xl" />
                <div className="absolute inset-0 z-10 w-1/2 -translate-x-1 -translate-y-1 bg-spj-yellow rounded-2xl" />
                <div className="absolute inset-0 z-10 w-1/2 -translate-x-1 translate-y-1 bg-spj-yellow rounded-2xl" />

                <div className="absolute inset-0 z-10 bg-white rounded-2xl" />

                <div className="relative z-20">
                  <Dialog.Title as="h3" className="pb-1 mb-0 text-lg font-bold leading-6 text-gray-900">
                    Download
                  </Dialog.Title>
                  <p className="pb-2 text-xs text-gray-400">
                    Enter your name, email and Design Set name to get instant access to your final design
                  </p>
                  <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit} ref={formRef}>
                    <label htmlFor="name" className="">
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full p-2 placeholder-gray-400 border border-gray-200 rounded-lg"
                        placeholder="Name"
                      />
                    </label>
                    <label htmlFor="email" className="">
                      <input
                        name="email"
                        type="email"
                        required
                        enterKeyHint="next"
                        className="w-full p-2 placeholder-gray-400 border border-gray-200 rounded-lg"
                        placeholder="Email"
                      />
                    </label>
                    <label htmlFor="name" className="">
                      <input
                        name="collage name"
                        type="text"
                        required
                        className="w-full p-2 placeholder-gray-400 border border-gray-200 rounded-lg"
                        placeholder="Design Set Name"
                      />
                    </label>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md disabled:bg-bluegray-400 disabled:pointer-events-none dis hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                        // onClick={closeModal}
                      >
                        Download Image
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DownloadModal;
