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
        <MaxWidthContainer className="mt-0">
          <SectionHeading
            preText={
              <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-orange-100 to-orange-300 w-fit">
                <HomeIcon className="w-8 h-8 text-orange-500" />
              </div>
            }
            title="Beautiful spaces await you"
            subTitle="From a corner to a whole room, see how our customers are transforming their homes"
            center
          />
          <div className="grid grid-cols-3 grid-rows-5 gap-4">
            <div className="row-span-2">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Mandarin"
                first
              />
            </div>
            <div className="row-span-3">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Nirnia"
              />
            </div>
            <div className="row-span-2">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Artex"
              />
            </div>
            <div className="row-span-3 row-start-3">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Brera"
              />
            </div>
            <div className="row-span-2 col-start-2 row-start-4">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Alea Pro"
              />
            </div>
            <div className="row-span-3 col-start-3 row-start-3">
              <ImageCard
                imgSrc="https://res.cloudinary.com/spacejoy/image/upload/v1732167831/spj-v2/home-v3/hero_bg_11_xyqqjo.jpg"
                title="Nirnia"
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
        <div className="group relative h-full w-full rounded-[2rem] shadow-md overflow-hidden">
          <div
            className={classNames(
              'relative w-full group-hover:scale-110 transition-all duration-300',
              first ? 'aspect-[1.5/1]' : 'h-full'
            )}
          >
            <Image src={imgSrc} alt={title} layout="fill" objectFit="cover" />
          </div>
          <div className="bg-gradient-to-b from-black/0 via-black/25 to-black absolute inset-0 text-white flex items-end">
            <div className="flex items-center justify-between w-full p-6">
              <p className="text-3xl">{title}</p>
              <div className="bg-white p-3 rounded-full">
                <ArrowRightIcon
                  className="group-hover:-rotate-45 focus:-rotate-45 group-hover:scale-105 focus:scale-105 transition-all duration-300 w-6 h-6 text-black"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BeautifulSpaces;
