import SectionHeading from '@components/EcommercePage/SectionHeading';
import { newSpacejoyStoreUrl } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { ProductHighlight } from './ProductHighlight';

export const Offers = () => {
  return (
    <div>
      <SectionHeading title="Offers" center noMargin />

      <div className="grid grid-cols-3 gap-4 mt-10 sm:grid-cols-3">
        <Link href={newSpacejoyStoreUrl} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688582/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_4_dbt4lp.png"
              alt="Shop More"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <Link href={newSpacejoyStoreUrl} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688602/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_3_xsya8j.png"
              alt="Exclusive Brands"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <Link href={newSpacejoyStoreUrl} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688570/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_zdxawu.png"
              alt="Doorbusters"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <ProductHighlight />
      </div>
    </div>
  );
};
