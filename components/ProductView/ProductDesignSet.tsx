import useProductDesignSets from '@hooks/useProductDesignSets';
import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductDesignSet = ({ productIds }) => {
  const { designSetData } = useProductDesignSets([...productIds]);

  const designs = React.useMemo(() => {
    return Object.keys(designSetData).reduce((acc, curr) => {
      return [...acc, ...designSetData[curr]];
    }, []);
  }, [designSetData]);

  if (designs?.length === 0) return null;

  return (
    <div className="pt-8 pb-16">
      <h2 className="text-2xl tracking-wide">See in a room</h2>
      <p className="mt-2 text-gray-700">Mix and match</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {designs?.slice(0, 5)?.map((product) => {
          return (
            <Link href={`/design-sets/${product?._id}`} key={product?._id}>
              <a className="group block">
                <div className="bg-white aspect-w-3 aspect-h-2 rounded-lg group-hover:opacity-75 lg:aspect-w-2 lg:aspect-h-1">
                  <Image
                    src={`${cloudinary.baseDeliveryURL}/q_auto,f_auto,w_600/${product?.thumbnail}`}
                    alt="Brown leather key ring with brass metal loops and rivets on wood table."
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgImage}
                    objectFit={'cover'}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 font-normal capitalize">{product?.name?.slice(0, -10)}</h3>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductDesignSet);
