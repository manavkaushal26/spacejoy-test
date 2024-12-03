import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import ImageWithDots from '@components/Shared/ImageWithDots';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { HeartIcon } from '@heroicons/react/solid';

type Props = {};
interface DotType {
  id: number;
  x: number;
  y: number;
  label: string;
  visible: boolean;
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

const data: DesignType[] = [
  {
    name: 'Transitional Living Room',
    description: 'A modern minimalist aesthetic with a touch of luxury.',
    url: 'https://www.spacejoy.com/interior-designs/living-room-ideas/eclectic-living-room-with-gallery-wall-66635f2b06a911000d0f4e4d',
    desktop: {
      imgSrc: '/v1733237680/spj-v2/home-v3/transitional_living_rl3hxo.webp',
      dots: [
        { id: 1, x: 0, y: 0, label: '', visible: true },
        { id: 2, x: 0, y: 0, label: '', visible: true },
        { id: 3, x: 0, y: 0, label: '', visible: true },
      ],
    },
    mobile: {
      imgSrc: '/v1733237951/spj-v2/home-v3/transitional_living_mobile_kicqha.webp',
      dots: [
        { id: 1, x: 0, y: 0, label: '', visible: true },
        { id: 2, x: 0, y: 0, label: '', visible: true },
        { id: 3, x: 0, y: 0, label: '', visible: true },
      ],
    },
  },
];

const LookBook = (props: Props) => {
  return (
    <MaxWidthContainer>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-spj-red/20 to-spj-red/50 w-fit">
            <HeartIcon className="w-8 h-8 text-rose-500" />
          </div>
        }
        title="Spacejoy Curated Collections"
        subTitle="Draw inspiration from rooms designed for our happy customers"
        center
        noMargin
      />
      <div className="w-full mt-10">
        <BaseCard className="!p-0" containerClassName="rounded-3xl" disabledHoverShadow>
          <ImageWithDots
            designData={data[0]}
            // src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_2500/v1733225749/spj-v2/home-v3/image_1_tuhohh.png"
            // alt="Modern Rustic Cabin"
            // dots={dots}
            // designData={{
            //   name: 'Modern Rustic Cabin',
            //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, nostrum.',
            //   url: 'https://www.spacejoy.com/interior-designs/open-living-and-dining-room-ideas/modern-rustic-cabin-with-rust-tones-670046e18d8448000d55c00e',
            // }}
          />
        </BaseCard>
      </div>
    </MaxWidthContainer>
  );
};

export default LookBook;
