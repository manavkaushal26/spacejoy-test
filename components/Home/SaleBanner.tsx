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
        <a>
          <div className="relative w-full aspect-[14/2] shadow-md hover:shadow-lg">
            <Image src={src} alt="sale banner" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SaleBanner;
