import {
  ChatAltIcon,
  EmojiHappyIcon,
  LightBulbIcon,
  LockClosedIcon,
  ShareIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';
import UnitAction from './UnitAction';

const MoreActions: React.FC = () => {
  return (
    <div className="bg-gray-100 w-20 p-4 flex-col space-y-2">
      <div className="rounded-full bg-white p-2 flex-col space-y-2 shadow-sm">
        <UnitAction position="left" title="Lock Design" onClick={() => null}>
          <LockClosedIcon className="h-4 w-4" />
        </UnitAction>
        <UnitAction position="left" title="Share" onClick={() => null}>
          <ShareIcon className="h-4 w-4" />
        </UnitAction>
        <UnitAction position="left" title="Magic" onClick={() => null}>
          <SparklesIcon className="h-4 w-4" />
        </UnitAction>
      </div>
      <div className="rounded-full bg-white p-2 flex-col space-y-2 shadow-sm">
        <UnitAction position="left" title="Ideas" onClick={() => null}>
          <LightBulbIcon className="h-4 w-4" />
        </UnitAction>
        <UnitAction position="left" title="Feedback" onClick={() => null}>
          <EmojiHappyIcon className="h-4 w-4" />
        </UnitAction>
        <div className="next-image-fix">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/w_70/v1628138169/spj-v2/DIY/emojis/angry_i0zybg.png"
            alt="angry"
            height="35"
            width="35"
          />
        </div>
        <div className="next-image-fix">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/w_70/v1628138185/spj-v2/DIY/emojis/okay_yjadc4.png"
            alt="angry"
            height="35"
            width="35"
          />
        </div>
        <div className="next-image-fix">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/w_70/v1628138205/spj-v2/DIY/emojis/good_bqckuq.png"
            alt="angry"
            height="35"
            width="35"
          />
        </div>
        <div className="next-image-fix">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/w_70/v1628138169/spj-v2/DIY/emojis/awesome_hsitft.png"
            alt="angry"
            height="35"
            width="35"
          />
        </div>
      </div>
      <div className="rounded-full bg-white p-2 flex-col space-y-2 shadow-sm">
        <UnitAction position="left" title="Help Chat" onClick={() => null}>
          <ChatAltIcon className="h-4 w-4" />
        </UnitAction>
      </div>
    </div>
  );
};

export default MoreActions;
