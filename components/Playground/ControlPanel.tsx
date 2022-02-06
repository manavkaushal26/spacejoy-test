import { Transition } from '@headlessui/react';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ColorSwatchIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline';
import { NavSelectContext } from '@store/NavSelect';
import { SelectedIdContext } from '@store/SelectedId';
import React, { useContext, useState } from 'react';
import { PlaygroundAssetsContext } from 'store/PlaygroundAssets';

const ControlPanel = () => {
  const { updateCurrentVerticalForRecommendation } = useContext(PlaygroundAssetsContext);
  const [nav, setNav] = useContext(NavSelectContext);
  const [selectedId, setSelectedId, { swapState, setSwapState }] = useContext(SelectedIdContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(!expanded);

  const onSwap = (navSection) => {
    if (navSection === 'recommendations') {
      updateCurrentVerticalForRecommendation(selectedId);
      setSwapState(true);
    }
    setNav(navSection);
  };

  return (
    <>
      <Transition
        show={!expanded}
        enter="transition-all duration-75"
        enterFrom="opacity-0 "
        enterTo="opacity-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-0 "
        leaveTo="opacity-0"
        className="flex items-center justify-center divide-x"
      >
        <div className="shadow-md  absolute bottom-4 right-4   flex">
          <button
            onClick={handleExpand}
            className={`  bg-white z-10  flex flex-col items-center p-4 rounded-xl  transition-all `}
          >
            <ArrowCircleLeftIcon className="h-8 w-8" />
            Start Swapping
          </button>
        </div>
      </Transition>

      <Transition
        show={expanded}
        enter="transition-all duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <div className="shadow-md absolute bottom-4 right-4  flex  divide-x ">
          <div className="relative group">
            <div className="bg-black rounded-lg p-1 -top-8 absolute text-white opacity-0 duration-150 group-hover:-top-10 group-hover:opacity-100 whitespace-pre">
              {!selectedId ? 'Select a product to swap' : 'Swap product for another'}
            </div>
            <button
              onClick={() => onSwap('recommendations')}
              className={`  bg-white  flex flex-col items-center p-4 rounded-l-xl transition-all ${
                !selectedId && 'pointer-events-none text-gray-400 cursor-not-allowed'
              } `}
            >
              <SwitchHorizontalIcon className="h-8 w-8" />
              Swap
            </button>
          </div>
          <div className="relative group">
            <div className="bg-black rounded-lg p-1 -top-10 -left-2/4 absolute text-white opacity-0 duration-150 group-hover:-top-10 group-hover:opacity-100 whitespace-pre">
              Change Room background
            </div>
            <button
              onClick={() => onSwap('roomSelection')}
              className={`  bg-white   flex flex-col items-center p-4  rounded-r-xl transition-all `}
            >
              <ColorSwatchIcon className="h-8 w-8" />
              Room Selector
            </button>
          </div>
          {/* <div>
            <button
              onClick={() => onSwap('roomSelection')}
              className={`  bg-white z-10  flex flex-col items-center p-4  transition-all `}
            >
              <SwitchHorizontalIcon className="h-8 w-8" />
              Swap Set
            </button>
          </div> */}
          <div className=" absolute -left-4 -top-4  rounded-full overflow-hidden transition-all">
            <button
              onClick={handleExpand}
              className={`  bg-white z-10 flex h-full  flex-col items-center justify-center transition-all `}
            >
              <ArrowCircleRightIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ControlPanel;
