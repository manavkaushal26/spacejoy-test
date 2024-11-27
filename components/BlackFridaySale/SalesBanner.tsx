import Image from 'next/image';
import Link from 'next/link';

export const SalesBanner = () => {
  return (
    <Link href="https://designs.spacejoy.com/new-project" passHref>
      <a className="relative block rounded-xl ">
        <Image
          src="https://res.cloudinary.com/spacejoy/image/upload/v1732688533/spj-v2/Black-Friday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_1_2_1_tcsxyt.png"
          alt="Sales Banner"
          width={1440}
          height={560}
          layout="responsive"
          objectFit="contain"
          className="rounded-xl"
        />
      </a>
    </Link>
  );
};
