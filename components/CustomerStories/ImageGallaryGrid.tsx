import { lightBoxOptions } from '@components/Carousel';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import SocialShare from '@components/SocialShare';

const getTemplate = (length) => {
  if (length === 1) {
    return 'grid-rows-1 grid-cols-1';
  } else if (length === 2) {
    return 'grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2';
  } else if (length < 5) {
    return `grid-row-3 sm:grid-rows-${length - 1} grid-cols-${length - 1} sm:grid-cols-8`;
  } else {
    return `grid-rows-4 sm:grid-rows-2 grid-cols-2 sm:grid-cols-8`;
  }
};

const ImageGallaryGrid = ({ data }) => {
  const [trimmedData, setTrimmedData] = useState(data.length > 5 ? data.splice(4, data.length - 5) : data);
  useMemo(() => {
    setTrimmedData(data);
  }, [data]);

  return (
    <div className="container">
      <div className={`grid gap-1 ${getTemplate(trimmedData.length)}`}>
        {trimmedData.map((item, index) => (
          <div
            className={`${
              index === 0
                ? `col-span-full ${
                    trimmedData.length > 4
                      ? 'row-span-2 sm:row-span-3 sm:col-span-4'
                      : `row-span-2 sm:row-span-3 ${trimmedData.length > 2 ? 'sm:col-span-6' : 'sm:col-span-1'}`
                  }`
                : `${
                    trimmedData.length > 4
                      ? 'row-span-1 col-span-1 sm:col-span-2'
                      : `${
                          trimmedData.length > 2
                            ? ` w-${1 / (trimmedData.length - 1)} sm:w-full  col-span-1 sm:col-span-2`
                            : 'col-span-1'
                        }`
                  }  `
            } bg-white overflow-hidden min-h-[100px] cursor-pointer pt-[55%] relative`}
            key={item._id}
          >
            {/* c_scale/ */}
            <Image
              src={`${imageKit.baseDeliveryUrlShort}/${item.cdn}`}
              alt=""
              className="absolute top-0 left-0 object-cover w-full h-full "
              layout="fill"
            />
            <div className="absolute opacity-0 top-1 right-1 hover:opacity-100">
              <SocialShare media={item.cdn} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallaryGrid;
