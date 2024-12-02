import { oldSpacejoyUrl } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';

export const SalesBanner = ({ desktopBanner, mobileBanner }: { desktopBanner: string; mobileBanner: string }) => {
  return (
    <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
      <a target="_blank">
        <div className="relative w-full aspect-[18/7] hidden rounded-xl lg:block overflow-hidden">
          <Image
            src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto' + desktopBanner}
            alt="Sales Banner"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
        <div className="relative w-full aspect-[3/4] block rounded-xl lg:hidden overflow-hidden">
          <Image
            src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto' + mobileBanner}
            alt="Sales Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </a>
    </Link>
  );
};
