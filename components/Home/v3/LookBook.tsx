import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import ImageWithDots from '@components/Shared/ImageWithDots';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { HeartIcon } from '@heroicons/react/solid';

enum WHITE_LABEL_RETAILERS_ENUM {
  EMPYREAN_LIVING = 'Empyrean Living',
  LUNA_AND_LUXE = 'Luna & Lux',
}

type WHITE_LABEL_RETAILERS = `${WHITE_LABEL_RETAILERS_ENUM}`;

interface DotType {
  id: number;
  x: number;
  y: number;
  label: string;
  retailer: WHITE_LABEL_RETAILERS;
  slug: string;
  position: 'top' | 'bottom';
}

interface DeviceType {
  imgSrc: string;
  dots: DotType[];
}

export interface DesignType {
  name: string;
  description: string;
  url: string;
  desktop: DeviceType;
  mobile: DeviceType;
}

const LookBook = () => {
  const designData: DesignType = {
    name: 'Transitional Living Room',
    description: 'A modern minimalist aesthetic with a touch of luxury.',
    url: 'https://www.spacejoy.com/interior-designs/living-room-ideas/transitional-mid-century-modern-living-room-with-built-in-shelving-67004cdda631cf000dabf412',
    desktop: {
      imgSrc: '/v1733237680/spj-v2/home-v3/transitional_living_rl3hxo.webp',
      dots: [
        {
          id: 1,
          x: 54.6,
          y: 85,
          label: 'Milet Coffee Table',
          retailer: 'Empyrean Living',
          slug: 'milet-coffee-table',
          position: 'bottom',
        },
        {
          id: 2,
          x: 46,
          y: 60,
          label: 'Layke Black Concrete Side Table',
          retailer: 'Luna & Lux',
          slug: 'layke-black-concrete-side-table',
          position: 'top',
        },
        {
          id: 3,
          x: 24,
          y: 60,
          label: 'Mayfair Side Table',
          retailer: 'Luna & Lux',
          slug: 'mayfair-side-table',
          position: 'top',
        },
      ],
    },
    mobile: {
      imgSrc: '/v1733237951/spj-v2/home-v3/transitional_living_mobile_kicqha.webp',
      dots: [
        {
          id: 1,
          x: 72,
          y: 65,
          label: 'Milet Coffee Table',
          retailer: 'Empyrean Living',
          slug: 'milet-coffee-table',
          position: 'top',
        },
        {
          id: 2,
          x: 24,
          y: 56,
          label: 'Layke Black Concrete Side Table',
          retailer: 'Luna & Lux',
          slug: 'layke-black-concrete-side-table',
          position: 'top',
        },
      ],
    },
  };

  return (
    <MaxWidthContainer>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-spj-red/20 to-spj-red/50 w-fit">
            <HeartIcon className="w-8 h-8 text-rose-500" />
          </div>
        }
        title="Your dream space? We’ve got the crew for that"
        subTitle="Stylish finds you can shop instantly"
        center
        noMargin
      />
      <div className="w-full mt-10">
        <BaseCard className="!p-0" containerClassName="rounded-3xl" disabledHoverShadow>
          <ImageWithDots designData={designData} />
        </BaseCard>
      </div>
    </MaxWidthContainer>
  );
};

export default LookBook;
