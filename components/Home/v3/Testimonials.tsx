import Slider from '@components/Carousel';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { AnnotationIcon, StarIcon } from '@heroicons/react/solid';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import { classNames } from '@utils/helpers';
import { default as TestimonialsData } from '@utils/Mocks/HomeTestimonials';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <>
      <SectionHeading
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-blue-100 to-blue-300 w-fit">
            <AnnotationIcon className="w-8 h-8 text-blue-500" />
          </div>
        }
        title="Get raving reviews from customers"
        subTitle="We'll take care of the heavy lifting so you can sit back and enjoy the compliments"
        center
      />
      <div className="pb-4 mt-12">
        {
          <Slider
            imageCount={10}
            slidesToShow={1}
            withNav={false}
            arrows={false}
            autoplay
            autoplaySpeed={5000}
            pauseOnHover
            pauseOnDotsHover
            responsive={
              {
                // dots: true,
                // arrows: false,
                // slidesToShow: 1.5,
                // className: 'with-space',
              }
            }
          >
            {TestimonialsData?.map((item) => {
              return <TestimonialCard data={item} key={item?.id} />;
            })}
          </Slider>
        }
      </div>
    </>
  );
};

const TestimonialCard = ({ data }) => {
  const [coverImgType, setType] = useState('after');

  return (
    <>
      <div className="grid grid-cols-1 gap-4 pb-2 cursor-default lg:grid-cols-5">
        <div className="relative col-span-3 shadow-md p-golden-ratio rounded-[1rem] overflow-hidden">
          <div className="absolute z-10 top-4 left-4">
            <button
              className={`rounded-l-md text-sm px-4 py-1 ${
                coverImgType === 'before' ? 'bg-spj-red text-white font-semibold' : 'bg-white'
              }`}
              onClick={() => setType('before')}
            >
              Before
            </button>
            <button
              className={`rounded-r-md text-sm px-4 py-1 ${
                coverImgType === 'after' ? 'bg-spj-red text-white font-semibold' : 'bg-white'
              }`}
              onClick={() => setType('after')}
            >
              After
            </button>
          </div>
          <Image
            src={`${cloudinary.baseDeliveryURL}/${data?.before?.img}`}
            alt={data?.before?.alt}
            layout="fill"
            objectFit="cover"
            className={classNames('rounded-[1rem] opacity-0 transition-all duration-300 pointer-events-none', {
              'opacity-100 pointer-events-auto': coverImgType === 'before',
            })}
            placeholder="blur"
            blurDataURL={blurredBgImage}
          />
          <Image
            src={`${cloudinary.baseDeliveryURL}/${data?.after.img}`}
            alt={data?.after?.alt}
            layout="fill"
            objectFit="cover"
            className={classNames('rounded-[1rem] opacity-0 transition-all duration-300 pointer-events-none', {
              'opacity-100 pointer-events-auto': coverImgType === 'after',
            })}
            placeholder="blur"
            blurDataURL={blurredBgImage}
          />
        </div>
        <div className="flex flex-col justify-center col-span-2 p-8 rounded-[1rem] shadow-md border border-gray-200">
          <div className="flex items-center space-x-0.5">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="mt-4 text-3xl font-semibold">{data?.shortDescription}.</p>
          <p className="mt-4 text-zinc-700">{data?.description}</p>
          <div className="flex items-center justify-center mt-8 lg:justify-start">
            <div className="relative w-16 h-16 rounded-full">
              <Image
                className="inline-block rounded-full"
                src={`${cloudinary.baseDeliveryURL}/${data?.dp}`}
                alt={data.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="flex-col items-center p-2">
              <p className="font-bold">{data?.name}</p>
              <p className="text-zinc-500">{data?.address}</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/customer-stories" passHref>
              <a className="flex items-center space-x-2 underline transition-all duration-200 text-zinc-500 group">
                <span>See more customer stories</span>
                <ArrowNarrowRightIcon className="w-4 h-4 transition-all duration-200 transform group-hover:translate-x-1" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
