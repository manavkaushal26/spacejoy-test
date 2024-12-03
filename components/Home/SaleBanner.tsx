import Image from 'next/image';
import Link from 'next/link';

type Props = {
  href: string;
  src: string;
};

const SaleBanner = ({ href, src }: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 mb-6 xl:px-20 sm:mt-40 sm:mb-12">
      <Link href={href} passHref>
        <a target={href.includes('https') ? '_blank' : '_self'}>
          <div className="relative w-full aspect-[15/2] shadow-md hover:shadow-lg transition-all duration-200">
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_100/w_1920,e_sharpen' + src}
              alt="sale banner"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SaleBanner;
