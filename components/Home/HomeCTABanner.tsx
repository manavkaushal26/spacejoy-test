import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const HomeCTABanner = (props: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
      <div className="w-3/4 mx-auto">
        <HomeSectionTitle className="text-center">
          <HomeSectionTitle.MainTitle>
            <span>Create a stunning home with quality products</span>
          </HomeSectionTitle.MainTitle>
        </HomeSectionTitle>
      </div>
      <div className="relative mt-12 border rounded-lg pg">
        <Image
          src="https://ik.imagekit.io/spacejoy/spacejoy/image/upload/tr:W-1920/manual/HomePageBB.png"
          alt="shop with us"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
          quality={100}
        />
      </div>
      <Link href="https://store.spacejoy.com/" passHref>
        <a target="_blank" rel="noopener noreferrer">
          <button className="flex items-center px-6 py-3 mx-auto mt-6 text-white bg-gray-900 rounded-lg group">
            <span>Shop Now</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 text-white transition-transform transform group-hover:translate-x-2" />
          </button>
        </a>
      </Link>
    </div>
  );
};

export default HomeCTABanner;
