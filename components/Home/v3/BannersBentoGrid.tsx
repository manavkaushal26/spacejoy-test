import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ExternalLinkIcon, GiftIcon } from '@heroicons/react/outline';
import { cloudinary } from '@utils/config';
import Image from 'next/image';

const ContentOverlay = ({ title }: { title: string }) => {
  return (
    <div className="absolute inset-0 flex items-end justify-start px-4 py-4 text-white transition-all duration-200 md:px-8 bg-gradient-to-b from-transparent via-black/5 to-black/50">
      <div className="flex items-center space-x-2">
        <p className="text-base font-semibold md:text-lg sm:text-xl">{title}</p>
        <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" aria-label="external link icon" />
      </div>
    </div>
  );
};

const BannersBentoGrid = () => {
  const cloudinaryDefault = cloudinary.baseDeliveryURL + '/fl_lossy,q_auto';

  return (
    <MaxWidthContainer>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-indigo-100 to-indigo-300 w-fit">
            <GiftIcon className="w-8 h-8 text-indigo-500" />
          </div>
        }
        title="Dream Spaces Begin Here"
        noMargin
        center
      />
      <div className="grid grid-cols-6 grid-rows-2 gap-4 mt-10">
        <div className="h-48 col-span-6 group md:col-span-4 lg:h-full">
          <div className="overflow-hidden rounded-xl max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="Explore living rooms image"
                src={cloudinaryDefault + '/w_1200/v1733307567/spj-v2/home-v3/banner_1_a_c9ydbt.webp'}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                layout="fill"
                priority
              />
              {/* <ContentOverlay title="Explore Living Room Ideas" /> */}
            </div>
          </div>
        </div>
        <div className="h-48 col-span-6 group md:col-span-2 lg:h-full">
          <div className="overflow-hidden rounded-xl lg:rounded-tr-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="Explore bedrooms image"
                src={cloudinaryDefault + '/w_740/v1733309596/spj-v2/home-v3/banner_2_3_mcsbdh.webp'}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                layout="fill"
                priority
              />
              {/* <ContentOverlay title="Explore Bedroom Ideas" /> */}
            </div>
          </div>
        </div>
        <div className="h-48 col-span-6 group md:col-span-2 lg:h-full">
          <div className="overflow-hidden rounded-xl lg:rounded-bl-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="Explore other rooms image"
                src={cloudinaryDefault + '/w_740/v1733309906/spj-v2/home-v3/banner_3_1_apuqme.webp'}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                layout="fill"
                priority
              />
              {/* <ContentOverlay title="Explore Other Room Ideas" /> */}
            </div>
          </div>
        </div>
        <div className="h-48 col-span-6 group md:col-span-4 lg:h-96">
          <div className="overflow-hidden rounded-xl max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] h-full shadow-md transition-all duration-200">
            <div className="relative w-full h-full group">
              <Image
                alt="banner 3"
                src={cloudinaryDefault + '/w_1200/v1733732735/spj-v2/home-v3/Sale%20Banners/holiday_sale_banner_jlcqab.webp'}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                layout="fill"
                priority
              />
              {/* <ContentOverlay title="This will be a sale banner" /> */}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default BannersBentoGrid;
