import SectionHeading from '@components/EcommercePage/SectionHeading';
import Image from 'next/image';
import Link from 'next/link';
import { ProductHighlight } from './ProductHighlight';

export const Offers = () => {
  return (
    <div>
      <SectionHeading title="Offers" center noMargin />

      <div className="grid grid-cols-3 sm:grid-cols-3 flex-wrap justify-between mt-8 gap-6">
        <Link href="/shop-more" passHref>
          <div className="col-span-3 sm:col-span-1 overflow-hidden rounded-lg ">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688582/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_4_dbt4lp.png"
              alt="Shop More"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Link>

        <Link href="/exclusive-brands" passHref>
          <div className="col-span-3 sm:col-span-1 overflow-hidden rounded-lg ">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688602/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_3_xsya8j.png"
              alt="Exclusive Brands"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Link>

        <Link href="/doorbusters" passHref>
          <div className="col-span-3 sm:col-span-1 overflow-hidden rounded-lg ">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1732688570/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_zdxawu.png"
              alt="Doorbusters"
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Link>
        <ProductHighlight />
      </div>
    </div>
  );
};
