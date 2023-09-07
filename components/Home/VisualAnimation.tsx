import { imageKit } from '@utils/config';
import Image from 'next/image';
import React from 'react';

const VisualAnimation: React.FC = () => {
  return (
    <div className="relative ">
      {/* /fl_lossy,f_auto,q_auto,w_1896,h_759 */}
      <Image
        className="filter contrast-125 object-cover"
        src={`${imageKit.baseDeliveryUrl}/v1622186205/spj-v2/spj-living-room_gyepig.jpg`}
        alt="spacejoy happy customer"
        height={'450'}
        width={'1896'}
        layout="responsive"
      />
      <div className="absolute inset-0 bg-gray-800 opacity-70" />
    </div>
  );
};

export default React.memo(VisualAnimation);
