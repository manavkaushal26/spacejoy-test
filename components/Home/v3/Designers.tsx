import ShinyButton from '@components/Button/ShinyButton';
import Slider from '@components/Carousel';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { UsersIcon } from '@heroicons/react/solid';
import { cloudinary, oldSpacejoyUrl } from '@utils/config';
import Image from 'next/image';
import { default as designTeamData } from '../../../mocks/DesignTeamData';

type Props = {};

const Designers = (props: Props) => {
  return (
    <MaxWidthContainer className="!pt-0">
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-orange-100 to-orange-300 w-fit">
            <UsersIcon className="w-8 h-8 text-orange-500" />
          </div>
        }
        title="The best design crew is waiting to work with you"
        subTitle="Let our experts design a space you'll love with products you can shop right away on Spacejoy!"
        center
        noMargin
      />
      <div className="pb-4 mx-auto mt-10 max-w-7xl">
        {
          <Slider
            imageCount={10}
            slidesToShow={1}
            withNav={false}
            arrows={false}
            autoplay={true}
            autoplaySpeed={5000}
            pauseOnHover
            pauseOnDotsHover
            infinite
            // fade // TODO :: causing issues with the shiny button
            responsive={
              {
                // dots: true,
                // arrows: false,
                // slidesToShow: 1.5,
                // className: 'with-space',
              }
            }
          >
            {designTeamData.map((d) => (
              <div key={`${d.firstName}-${d.lastName}`} className="pb-4 cursor-default pointer-events-auto">
                <div className="grid grid-cols-1 p-4 gap-y-8 md:gap-12 md:grid-cols-3">
                  <div className="w-[75%] mx-auto sm:w-full sm:mr-auto col-span-1 relative aspect-[1]">
                    <Image
                      src={cloudinary.baseDeliveryURL + '/fl_lossy,q_auto,w_785/' + d.bg}
                      alt={d.firstName + ' ' + d.lastName}
                      layout="fill"
                      objectFit="cover"
                      className="object-top rounded-3xl"
                      priority
                    />
                    {/* <div className="absolute bottom-1/2 left-1/2 rounded-tr-[1.9rem] rounded-tl-md rounded-br-md bg-gradient-to-br from-spj-red to-spj-yellow -z-[1] -top-2 -right-2" />
                    <div className="absolute top-1/2 right-1/2 rounded-bl-[1.9rem] rounded-tl-md rounded-br-md bg-gradient-to-br from-spj-red to-spj-yellow -z-[1] -bottom-2 -left-2" /> */}
                  </div>
                  <div className="flex flex-col items-start justify-center col-span-2 space-y-6">
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-base text-zinc-500">Meet</span>
                      <p className="mt-1 text-4xl sm:text-5xl text-semibold text-spj-red">
                        {d.firstName + ' ' + d.lastName}
                      </p>
                      <p className="mt-4 text-base md:text-xl text-zinc-700">{d.desc}</p>
                    </div>
                    <div>
                      <ShinyButton href={oldSpacejoyUrl + '/new-project'} target="_blank" showArrow showRing>
                        Hire {d.firstName}
                      </ShinyButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        }
      </div>
    </MaxWidthContainer>
  );
};

export default Designers;
