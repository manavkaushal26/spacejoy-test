import PulseDot from '@components/Shared/PulseDot';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';


const BroadcastStrip = ({ noSticky = false }) => {
  const { data } = useFirebaseContext();

  return (
    data?.broadcastV2?.broadcaststripVisible ? (
      <div className=" z-50 top-0 bg-[#2F3640] text-sm text-white flex justify-center h-10 w-full overflow-hidden my-0">
        {data?.broadcastV2?.link !== '' && !!data?.broadcastV2?.link ? (
          <Link href={data?.broadcastV2.link} as={data?.broadcastV2.link}>
            <a href={data?.broadcastV2.link}>
              <div className=" text-center text-xs sm:text-sm my-auto">
                {data?.broadcastV2?.beforePulseDot}
                {data?.broadcastV2?.pulseDot && <PulseDot />}
                {data?.broadcastV2?.afterPulseDot}
                <span className="">
                  {data?.broadcastV2?.isHighlightCoupon ? ' Use code:' : ''}
                  <strong>{data?.broadcastV2?.highlightText}</strong>
                </span>
                <span> {data?.broadcastV2?.afterCoupon}</span>
                &nbsp;
                {/* {data?.broadcastV2?.timerVisible && (
								<span className="timer">
									Sale ends in:{" "}
									<CountDownStyled>
										<CountdownWatch days={data?.countdownV2?.time} />
									</CountDownStyled>
								</span>
							)} */}
              </div>
            </a>
          </Link>
        ) : (
          <div className=" text-center text-xs sm:text-sm my-auto">
            {data?.broadcastV2?.beforePulseDot}
            {data?.broadcastV2?.pulseDot && <PulseDot />}
            {data?.broadcastV2?.afterPulseDot}
            <span>
              {data?.broadcastV2?.isHighlightCoupon ? ' Use code: ' : ''}
              <b>{data?.broadcastV2?.highlightText}</b>
            </span>
            <span> {data?.broadcastV2?.afterCoupon}</span>
            &nbsp;
            {/* {data?.broadcastV2?.timerVisible && (
						<span className="timer">
							Sale ends in:{" "}
							<CountDownStyled>
								<CountdownWatch days={data?.countdownV2?.time} />
							</CountDownStyled>
						</span>
					)} */}
          </div>
        )}
      </div>
    ) : null
  );
}

export default React.memo(BroadcastStrip);
