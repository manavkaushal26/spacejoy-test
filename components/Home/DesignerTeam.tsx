import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import Carousel, { position } from '@components/Shared/Carousel';
import TeamData from '@mocks/DesignTeamData';
import { blurredBgImage } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import useWindowSize from '@utils/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
  isMobile: string | boolean;
};

const DesignerTeam = ({ isMobile }: Props) => {
  const { width } = useWindowSize();
  const isScreenMedium = useMemo(() => width < 768, [width]);

  return (
    <div className="container px-4 mx-auto mt-16 mb-6 xl:px-20 sm:mt-32 sm:mb-12">
      <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-x-8 xl:space-x-32">
        <div className="flex-1 mt-6 sm:mt-0">
          <HomeSectionTitle className="text-left">
            <HomeSectionTitle.MainTitle>
              Design your space
              <br />
              <span className="text-[#F5296E]">Live your joy</span>
            </HomeSectionTitle.MainTitle>
            {isMobile !== 'true' && (
              <HomeSectionTitle.Description align="left" isMaxWidthHalf={false}>
                Let our experts design a space you&apos;ll love with products you can shop right away on Spacejoy!
              </HomeSectionTitle.Description>
            )}
          </HomeSectionTitle>
          {!isScreenMedium && (
            <Link href={`/quiz/start-quiz`} passHref>
              <a rel="noopener noreferrer">
                <button
                  type="button"
                  className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                >
                  Hire a Designer
                </button>
              </a>
            </Link>
          )}
        </div>
        <div className="relative w-full mx-auto md:w-1/2">
          <Carousel centerPadding="0%" centerMode customButtons={false} buttons={false} position={position.bottom}>
            {TeamData.map((item) => (
              <div key={item.lastName}>
                <div className="relative aspect-[3/4] sm:aspect-[1] md:aspect-[3/4] lg:aspect-[1] rounded-3xl">
                  <Image
                    src={`https://res.cloudinary.com/spacejoy/fl_lossy,q_auto,w_800/${item.bg}`}
                    alt={`${item.firstName}'s profile image`}
                    className="object-cover object-center w-full h-full rounded-3xl"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={blurredBgImage}
                  />
                  <div className="absolute top-auto flex items-end justify-center -translate-x-1/2 bottom-28 left-1/2">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold whitespace-pre text-gray-50">
                        {item.firstName} {item.lastName}
                      </h2>
                      <p className="mt-2 text-white">Design Expert</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {isScreenMedium && (
          <div className="text-center">
            <Link href={`${oldSpacejoyUrl}/online-interior-design`} passHref>
              <a target="_blank" rel="noopener noreferrer">
                <button
                  type="button"
                  className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                  onClick={() => {
                    PushEvent({
                      category: `Explore Sets`,
                      action: `Go to Room Select`,
                      label: `HP Connect Explore Sets Button`,
                    });
                  }}
                >
                  Hire a Designer
                </button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignerTeam;
