import { Transition } from '@headlessui/react';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ColorSwatchIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline';
import { NavSelectContext } from '@store/NavSelect';
import { SelectedIdContext } from '@store/SelectedId';
import { PushEvent } from '@utils/analyticsLogger';
import React, { useContext, useState } from 'react';
import { PlaygroundAssetsContext } from 'store/PlaygroundAssets';

const ControlPanel = ({ designSetId }) => {
  const { updateCurrentVerticalForRecommendation } = useContext(PlaygroundAssetsContext);
  const [nav, setNav] = useContext(NavSelectContext);
  const [selectedId, setSelectedId, { swapState, setSwapState }] = useContext(SelectedIdContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
    PushEvent({
      category: `Click on Start Swapping`,
      action: `Open Control Center | ${designSetId}`,
      label: 'Engage with Design Set',
    });
  };

  const onSwap = (navSection) => {
    if (navSection === 'recommendations') {
      PushEvent({
        category: `Click on Swap(control center)`,
        action: `Open Swap Menu | ${designSetId} | ${selectedId}`,
        label: 'Engage with Design Set',
      });
      updateCurrentVerticalForRecommendation(selectedId);
      setSwapState(true);
    } else {
      PushEvent({
        category: `Click on Select Background`,
        action: `Open Background Menu | ${designSetId}`,
        label: 'Engage with Design Set',
      });
      setNav(navSection);
    }
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
        <div className="absolute flex shadow-md bottom-4 right-4">
          <button
            onClick={handleExpand}
            className={`  bg-white z-10  flex flex-col items-center p-4 rounded-xl  transition-all `}
          >
            <ArrowCircleLeftIcon className="w-8 h-8" />
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
        <div className="absolute flex divide-x shadow-md bottom-4 right-4 ">
          <div className="relative group">
            <div className="absolute p-1 text-white whitespace-pre duration-150 bg-black rounded-lg opacity-0 -top-8 group-hover:-top-10 group-hover:opacity-100">
              {!selectedId ? 'Select a product to swap' : 'Swap product for another'}
            </div>
            <button
              onClick={() => onSwap('recommendations')}
              className={`  bg-white  flex flex-col items-center p-4 rounded-l-xl transition-all ${
                !selectedId && 'pointer-events-none text-gray-400 cursor-not-allowed'
              } `}
            >
              <SwitchHorizontalIcon className="w-8 h-8" />
              Swap
            </button>
          </div>
          <div className="relative group">
            <div className="absolute p-1 text-white whitespace-pre duration-150 bg-black rounded-lg opacity-0 -top-10 -left-2/4 group-hover:-top-10 group-hover:opacity-100">
              Change Room background
            </div>
            <button
              onClick={() => onSwap('roomSelection')}
              className={`  bg-white   flex flex-col items-center p-4  rounded-r-xl transition-all `}
            >
              <ColorSwatchIcon className="w-8 h-8" />
              Room Selector
            </button>
          </div>
          {/* <div>
            <button
              onClick={() => onSwap('roomSelection')}
              className={`  bg-white z-10  flex flex-col items-center p-4  transition-all `}
            >
              <SwitchHorizontalIcon className="w-8 h-8" />
              Swap Set
            </button>
          </div> */}
          <div className="absolute overflow-hidden transition-all rounded-full -left-4 -top-4">
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
