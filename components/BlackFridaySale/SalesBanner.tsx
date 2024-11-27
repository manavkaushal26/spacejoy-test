import { oldSpacejoyUrl } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';

export const SalesBanner = () => {
  return (
    <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
      <a target="_blank">
        <div className="relative w-full aspect-[18/7] hidden rounded-xl lg:block overflow-hidden">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1732688533/spj-v2/Black-Friday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_1_2_1_tcsxyt.webp"
            alt="Sales Banner"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
        <div className="relative w-full aspect-[3/4] block rounded-xl lg:hidden overflow-hidden">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1732719268/spj-v2/Black-Friday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_Poster_Portrait_nqv85n.webp"
            alt="Sales Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </a>
    </Link>
  );
};
