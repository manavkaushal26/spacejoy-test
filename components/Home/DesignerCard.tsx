import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
const Index = ({ data }) => {
  const [coverImgType, setType] = useState('after');

  return (
    <div className="bg-white rounded-lg border border-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="col-span-4 p-golden-ratio relative">
          <div className="z-10 absolute top-4 left-4">
            <button
              className={`rounded-l-md text-sm px-4 py-1 ${
                coverImgType === 'before' ? 'bg-gray-900 text-white' : 'bg-white'
              }`}
              onClick={() => setType('before')}
            >
              Before
            </button>
            <button
              className={`rounded-r-md text-sm px-4 py-1 ${
                coverImgType === 'after' ? 'bg-gray-900 text-white' : 'bg-white'
              }`}
              onClick={() => setType('after')}
            >
              After
            </button>
          </div>
          <Image
            src={`${imageKit.baseDeliveryUrl}/${
              coverImgType === 'before' ? `${data?.before?.img}` : `${data?.after.img}`
            }`}
            alt={data?.after?.alt}
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
            placeholder="blur"
            blurDataURL={blurredBgImage}
          />
        </div>
        <div className="col-span-2 p-12 flex flex-col justify-center">
          <p className="font-bold text-xl ">{data?.shortDescription}.</p>
          <p className="mt-8 line-clamp-4 quotes "> &nbsp;{data?.description} &nbsp;</p>
          <div className="flex mt-8 items-center justify-center lg:justify-start">
            <div className="h-32 w-32 relative">
              <Image
                className="inline-block rounded-xl"
                src={`${imageKit.baseDeliveryUrl}/${data?.dp}`}
                alt=""
                // height="90"
                // width="90"
                layout="fill"
                objectFit="contain"
              />
            </div>

            <div className="p-2 flex-col items-center">
              <p className="font-bold">{data?.name}</p>
              <p>{data?.address}</p>
            </div>
          </div>
          <div className="mt-8 text-center lg:text-left">
            <Link href="/customer-stories" passHref>
              <a className="underline">See more customer stories</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
