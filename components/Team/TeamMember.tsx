import { imageKit } from '@utils/config';
import Image from 'next/image';
import React from 'react';
import { Scene } from 'react-scrollmagic';
import styled, { keyframes } from 'styled-components';

const entry = keyframes`
	from { 
		opacity: 0;
		transform: translateY(100px);
	}
	to {
		opacity: 1;
		transform: translateY(0px);
	}
`;

const AnimateBox = styled.div`
  opacity: 0;
  transform: translateY(100px);
  &.entry {
    animation: ${entry} 0.4s forwards;
  }
`;

interface TeamMemberInterface {
  designer: {
    firstName: string;
    lastName: string;
    icon: string;
  };
}

const TeamMember: React.FC<TeamMemberInterface> = ({ designer }) => {
  return (
    <li>
      <Scene classToggle="entry" triggerHook={1} indicators={false} reverse={true}>
        <AnimateBox>
          <Image
            className="object-cover w-20 h-20 mx-auto rounded-full lg:w-24 lg:h-24 filter contrast-125"
            src={`${imageKit.baseDeliveryUrl}/${designer.icon}`}
            alt={designer.firstName}
            height={'180'}
            width={'180'}
            layout="responsive"
          />
          <div className="">
            <p className="text-sm font-bold">
              {designer.firstName} {designer.lastName}
            </p>
            <p className="text-xs text-indigo-400">Design Expert</p>
          </div>
        </AnimateBox>
      </Scene>
    </li>
  );
};

export default React.memo(TeamMember);
