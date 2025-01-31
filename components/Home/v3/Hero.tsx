import ShinyButton from '@components/Button/ShinyButton';
import FlipWords from '@components/Shared/FlipWords';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { useEffect, useState } from 'react';
import { ImagesSlider } from './ImagesSlider';

type Props = {};

const showSectionGradient = false;

const words = ["Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room', 'Imagination'];

const backgrounds = [
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1737713903/spacejoy-v3/home/kids_room_hero_mvscll.webp',
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.webp',
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1737717654/spacejoy-v3/home/dining_hero_cinknk.webp',
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1737717420/spacejoy-v3/home/home_office_hero_gpdsol.webp',
  'https://res.cloudinary.com/spacejoy/image/upload/v1737718726/spacejoy-v3/home/bedroom_hero_2_mbhenx.jpg',
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1732521852/spj-v2/home-v3/hero_bg_zab1qe.webp',
  'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,e_sharpen/v1732109954/spj-v2/home-v3/hero_bg_1_muwmcz.webp',
];

export const Hero = (props: Props) => {
  const duration = 5000;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1 === backgrounds.length ? 0 : prevIndex + 1));
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="h-[calc(100vh-175px)] min-h-[600px]">
      <ImagesSlider images={backgrounds} overlay={false} initialIndex={currentIndex}>
        <MaxWidthContainer className="absolute inset-0 flex flex-col justify-center font-normal !py-0 z-50">
          <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] space-y-4 text-foreground bg-white bg-clip-padding backdrop-filter backdrop-blur-lg md:backdrop-blur-sm bg-opacity-50 px-10 py-16 rounded-[1rem] md:rounded-none md:py-0 md:h-full flex flex-col justify-center">
            <h1 className="text-4xl font-light md:text-5xl lg:text-[3.3rem]">
              The home you&apos;ve always imagined starts here
            </h1>
            <div className="text-lg md:text-2xl">
              Design Your <FlipWords words={words} className="font-semibold !text-spj-red" currentIndex={currentIndex} />
            </div>
            <div className="flex flex-col items-start pt-4 space-y-2 xl:space-x-4 xl:space-y-0 xl:items-center xl:flex-row">
              <ShinyButton
                href="https://designs.spacejoy.com/new-project"
                target="_blank"
                showRing={false}
                className="w-full xl:w-fit"
              >
                Design Your Room
              </ShinyButton>
              {/* <Link href="/interior-designs" passHref>
              <a className={buttonVariants({ variant: 'outline', className: 'text-black w-full xl:w-fit' })}>
                Meet Our Designers
              </a>
            </Link> */}
            </div>
            <p>
              <span className="font-semibold text-spj-red">200,000+</span> beautiful rooms designed and delivered{' '}
              <span className="font-semibold text-spj-red lg:block 2xl:inline-block">since 2019</span>
            </p>
          </div>
        </MaxWidthContainer>
      </ImagesSlider>
    </div>
  );
};
