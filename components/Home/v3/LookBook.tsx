import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import ImageWithDots from '@components/Shared/ImageWithDots';
import { HeartIcon } from '@heroicons/react/solid';

type Props = {};

const dots = [
  { x: 18, y: 42, label: 'Lamp' },
  { x: 86, y: 40, label: 'Wall Painting' },
  { x: 56, y: 85, label: 'Ottoman' },
];

const LookBook = (props: Props) => {
  return (
    <>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-spj-red/20 to-spj-red/50 w-fit">
            <HeartIcon className="w-8 h-8 text-rose-500" />
          </div>
        }
        title="Spacejoy Curated Collections"
        subTitle="Draw inspiration from rooms designed for our happy customers"
        center
      />
      <div className="w-full mt-10">
        <BaseCard className="!p-0" containerClassName="rounded-3xl" disabledHoverShadow>
          <ImageWithDots
            src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1502,h_628/v1728071399/server/production/server/designs/render/670046e58d8448000d55c067.jpg"
            alt="Modern Rustic Cabin"
            dots={dots}
            designData={{
              name: 'Modern Rustic Cabin',
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, nostrum.',
              url: 'https://www.spacejoy.com/interior-designs/open-living-and-dining-room-ideas/modern-rustic-cabin-with-rust-tones-670046e18d8448000d55c00e',
            }}
          />
        </BaseCard>
      </div>
    </>
  );
};

export default LookBook;
