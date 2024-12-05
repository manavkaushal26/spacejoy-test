import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const BeautifulSpaces = (props: Props) => {
  return (
    <>
      <div>
        <MaxWidthContainer>
          <SectionHeading
            preText={
              <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-orange-100 to-orange-300 w-fit">
                <HomeIcon className="w-8 h-8 text-orange-500" />
              </div>
            }
            title="Inspiration to Elevate your Home"
            subTitle="From a corner to a whole room, see how our customers have transformed their homes"
            center
            noMargin
          />
          <div className="grid grid-cols-2 grid-rows-6 gap-2 mt-10 lg:grid-rows-5 lg:gap-4 lg:grid-cols-3">
            <div className="row-span-2">
              <ImageCard
                imgSrc="/v1733216291/spj-v2/home-v3/beautiful_outdoor_space_1_twhozw.webp"
                title="Outdoor Spaces"
                href="/interior-designs/outdoor-ideas"
                first
              />
            </div>
            <div className="row-span-2 lg:row-span-3">
              <ImageCard
                imgSrc="/v1733310266/spj-v2/home-v3/licing_room_a_sl6lqm.webp"
                title="Living Rooms"
                href="/interior-designs/living-room-ideas"
              />
            </div>
            <div className="row-span-2 row-start-3 lg:row-start-1 lg:col-start-3">
              <ImageCard
                imgSrc="/v1733216973/spj-v2/home-v3/beautiful_nursery_space_1_vfosjn.webp"
                title="Nursery Rooms"
                href="/interior-designs/nursery-ideas"
              />
            </div>
            <div className="row-span-2 row-start-5 lg:row-span-3 lg:row-start-3">
              <ImageCard
                imgSrc="/v1733312429/spj-v2/home-v3/dining_1_pohj8w.webp"
                title="Dining Rooms"
                href="/interior-designs/dining-room-ideas"
              />
            </div>
            <div className="col-start-2 row-span-2 row-start-3 lg:row-span-2 lg:row-start-4">
              <ImageCard
                imgSrc="/v1733214261/spj-v2/home-v3/beautiful_bedroom_space_zawn04.webp"
                title="Bedrooms"
                href="/interior-designs/bedroom-ideas"
              />
            </div>
            <div className="col-start-2 row-span-2 row-start-5 lg:col-start-3 lg:row-span-3">
              <ImageCard
                imgSrc="/v1733310175/spj-v2/home-v3/home_office_a_kfh106.webp"
                title="Home Offices"
                href="/interior-designs/home-office-ideas"
              />
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </>
  );
};

const ImageCard = ({
  href = '',
  imgSrc,
  title,
  first = false,
}: {
  href?: string;
  imgSrc: string;
  title: string;
  first?: boolean;
}) => {
  return (
    <Link href={href ?? '#'}>
      <a target="_blank">
        <div className="group relative h-full w-full rounded-[1rem] lg:rounded-[2rem] shadow-md overflow-hidden">
          <div
            className={classNames(
              'relative w-full group-hover:scale-105 transition-all duration-300',
              first ? 'aspect-[1.5/1]' : 'h-full'
            )}
          >
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/f_auto,q_auto,w_800' + imgSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          {title && (
            <div className="absolute inset-0 flex items-end text-white bg-gradient-to-b from-transparent via-black/5 to-black/50 translate-y-100">
              <div className="flex items-center justify-between w-full p-3 sm:p-6">
                <p className="text-base md:text-xl lg:text-2xl">{title}</p>
                <div className="p-1 bg-white rounded-full sm:p-2">
                  <ArrowRightIcon
                    className="w-4 h-4 text-black transition-all duration-300 lg:w-6 lg:h-6 group-hover:-rotate-45 focus:-rotate-45 group-hover:scale-105 focus:scale-105"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default BeautifulSpaces;
