
import Carousel from '@components/Carousel';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const responsive = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 2000,
};

const correctedSlug = (slug:string) => {
  return slug?.split(' ').join('-');
}

const SimilarPickCard = ({ data }) => {
  return (
    <Link href={`/interior-designs/${correctedSlug(data.room.slug)}/${data?.slug}`}>
      <a className="mt-5 rounded inline-block w-full focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none">
        <div className=" rounded relative overflow-hidden bg-gray-200 transition-all transform duration-300 shadow-sm hover:shadow-xl hover:scale-105 border border-gray-300">
          <div className="w-full aspect-w-2 aspect-h-1">
            <Image
              alt={data?.name}
              src={`${cloudinary.baseDeliveryURL}/${data?.cdnRender[0]}`}
              className="w-full h-full object-center object-cover"
              layout="fill"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
          </div>
          <div className="py-4 absolute bottom-0 h-fit bg-gradient-to-t from-gray-900 to-transparent px-4">
            <p className="text-sm md:text-base sm:text-xl  text-white mb-1">
              {data?.name}
              <ArrowRightIcon className="transition-transform transform hover:translate-x-3 inline w-4 h-4" />
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

const SimilarPicks = ({ data }) => {
  return (
    <>
      <Carousel
        responsive={responsive}
        imageCount={data.length}
        slidesToShow={3}
        // autoplay
        // autoplaySpeed={3000}
        // infinite
      >
        {data.map((item) => {
          return item?.room && <SimilarPickCard data={item} key={item?._id} />;
        })}
      </Carousel>
    </>
  );
};

export default React.memo(SimilarPicks);
