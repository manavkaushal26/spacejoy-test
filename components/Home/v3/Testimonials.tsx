import Slider from '@components/Carousel';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import Compare from '@components/Shared/Compare';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { AnnotationIcon, StarIcon } from '@heroicons/react/solid';
import { cloudinary } from '@utils/config';
import { default as TestimonialsData } from '@utils/Mocks/HomeTestimonials';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <MaxWidthContainer className="!pt-0">
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-blue-100 to-blue-300 w-fit">
            <AnnotationIcon className="w-8 h-8 text-blue-500" />
          </div>
        }
        title="Get raving reviews from customers"
        subTitle="We'll take care of the heavy lifting so you can sit back and enjoy the compliments"
        center
        noMargin
      />
      <div className="pb-4 mt-10">
        <Slider
          imageCount={10}
          slidesToShow={1}
          withNav={false}
          arrows={false}
          autoplay
          autoplaySpeed={5000}
          pauseOnHover
          pauseOnDotsHover
          infinite
          responsive={{
            arrows: true,
            // draggable: false,
            // swipeToSlide: false,
            // swipe: false,
            // touchMove: false,
            // buttons:true,
            // touchMove: false,
          }}
        >
          {TestimonialsData?.map((item) => {
            return <TestimonialCard data={item} key={item?.id} />;
          })}
        </Slider>
      </div>
    </MaxWidthContainer>
  );
};

const TestimonialCard = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 pb-2 cursor-default lg:gap-4 lg:grid-cols-5">
        {/* Image Section */}
        <div
          className="relative col-span-1 lg:col-span-3 shadow-md rounded-t-[1rem] lg:rounded-[1rem] overflow-hidden"
          onTouchStart={(e) => e.stopPropagation()} 
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* <div className="absolute z-10 flex space-x-2 top-2 left-2 lg:top-4 lg:left-4">
            <button
              className={`rounded-l-md text-xs lg:text-sm px-2 lg:px-4 py-1 ${
                coverImgType === 'before' ? 'bg-spj-red text-white font-semibold' : 'bg-white'
              }`}
              onClick={() => setType('before')}
            >
              Before
            </button>
            <button
              className={`rounded-r-md text-xs lg:text-sm px-2 lg:px-4 py-1 ${
                coverImgType === 'after' ? 'bg-spj-red text-white font-semibold' : 'bg-white'
              }`}
              onClick={() => setType('after')}
            >
              After
            </button>
          </div>
          <Image
            src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_890/${data?.before?.img}`}
            alt={data?.before?.alt}
            layout="fill"
            objectFit="cover"
            className={classNames(
              'rounded-t-[1rem] lg:rounded-[1rem] opacity-0 transition-all duration-300 pointer-events-none',
              {
                'opacity-100 pointer-events-auto': coverImgType === 'before',
              }
            )}
          />
          <Image
            src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_890/${data?.after.img}`}
            alt={data?.after?.alt}
            layout="fill"
            objectFit="cover"
            className={classNames(
              'rounded-t-[1rem] lg:rounded-[1rem] opacity-0 transition-all duration-300 pointer-events-none',
              {
                'opacity-100 pointer-events-auto': coverImgType === 'after',
              }
            )}
          /> */}
          <Compare
            firstImage={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_890/${data?.before?.img}`}
            secondImage={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_890/${data?.after.img}`}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="w-full aspect-[1.65/1]"
            slideMode="hover"
            initialSliderPercentage={27}
            // autoplay={true}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center col-span-1 lg:col-span-2 p-6 lg:p-8 rounded-b-[1rem] lg:rounded-[1rem] shadow-md border border-gray-200">
          <div className="flex items-center space-x-0.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-500 lg:w-6 lg:h-6" />
              ))}
          </div>
          <p className="mt-4 text-lg font-semibold lg:text-3xl">{data?.shortDescription}.</p>
          <p className="mt-4 text-sm lg:text-base text-zinc-700">{data?.description}</p>
          <div className="flex items-center justify-start mt-6 lg:mt-8">
            <div className="relative w-12 h-12 rounded-full lg:w-16 lg:h-16">
              <Image
                className="inline-block rounded-full"
                src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_100/${data?.dp}`}
                alt={data.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col pl-4">
              <p className="text-sm font-bold lg:text-base">{data?.name}</p>
              <p className="text-xs lg:text-sm text-zinc-500">{data?.address}</p>
            </div>
          </div>
          <div className="mt-6 lg:mt-8">
            <Link href="/customer-stories" passHref>
              <a className="flex items-center space-x-2 underline transition-all duration-200 text-zinc-500 group">
                <span className="text-sm lg:text-base">See more customer stories</span>
                <ArrowNarrowRightIcon className="w-3 h-3 transition-all duration-200 transform lg:w-4 lg:h-4 group-hover:translate-x-1" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
