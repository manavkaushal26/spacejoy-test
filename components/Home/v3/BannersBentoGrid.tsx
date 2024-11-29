import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { cloudinary } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';

const ContentOverlay = ({ title, href }: { title: string; href?: string }) => {
  return (
    <Link href={href ?? '#'}>
      <a target="_blank" rel="noopener noreferrer">
        <div className="absolute inset-0 flex items-end justify-start px-8 py-4 text-white transition-all duration-200 bg-gradient-to-b from-transparent via-black/25 to-black/75">
          <div className="flex items-center space-x-2">
            <p className="text-lg font-semibold sm:text-xl">{title}</p>
            {href && <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" aria-label="external link icon" />}
          </div>
        </div>
      </a>
    </Link>
  );
};

const BannersBentoGrid = () => {
  const cloudinaryDefault = cloudinary.baseDeliveryURL + '/fl_lossy,q_auto';

  return (
    <MaxWidthContainer>
      <SectionHeading title="test" subTitle="test" noMargin center />
      <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-10">
        <div className="h-[200px] col-span-6 md:col-span-4 lg:h-full">
          <div className="overflow-hidden rounded-lg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] h-full shadow-md transition-all duration-200">
            <Link href="/interior-designs/living-room-ideas" passHref>
              <a target="_blank" rel="noopener noreferrer">
                <div className="relative w-full h-full group">
                  <Image
                    alt="Explore living rooms image"
                    src={cloudinaryDefault + '/w_1200/v1732783468/spj-v2/Living_room_2_pqv0ly.webp'}
                    className="object-cover"
                    layout="fill"
                    priority
                  />
                  <ContentOverlay title="Explore Living Room Ideas" href="" />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="h-[200px] col-span-6 md:col-span-2 lg:h-full">
          <div className="overflow-hidden rounded-lg lg:rounded-tr-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="Explore bedrooms image"
                src={cloudinaryDefault + '/w_740/v1732782844/spj-v2/Bedroom_ajqj8s.webp'}
                className="object-cover"
                layout="fill"
                priority
              />
              <ContentOverlay title="Explore Bedroom Ideas" href="" />
            </div>
          </div>
        </div>
        <div className="h-[200px] col-span-6 md:col-span-2 lg:h-full">
          <div className="overflow-hidden rounded-lg lg:rounded-bl-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="Explore other rooms image"
                src={cloudinaryDefault + '/w_740/v1732783471/spj-v2/Outdoor_un6kx1.webp'}
                className="object-cover"
                layout="fill"
                priority
              />
              <ContentOverlay title="Explore Other Room Ideas" href="" />
            </div>
          </div>
        </div>
        <div className="h-[200px] col-span-6 md:col-span-4 lg:h-80">
          <div className="overflow-hidden rounded-lg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="banner 3"
                src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1000/v1732167832/spj-v2/home-v3/hero_bg_13_ktwcqe.webp"
                className="object-cover"
                layout="fill"
                priority
              />
              <ContentOverlay title="This will be a sale banner" href="" />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default BannersBentoGrid;
