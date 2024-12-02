import SectionHeading from '@components/EcommercePage/SectionHeading';
import Image from 'next/image';
import Link from 'next/link';
import { ProductHighlight } from './ProductHighlight';

type OffersType = {
  image1: { href: string; src: string; alt: string };
  image2: { href: string; src: string; alt: string };
  image3: { href: string; src: string; alt: string };
  packageHighlightBackground: string;
  sale: string;
};

export const Offers = ({ image1, image2, image3, packageHighlightBackground, sale }: OffersType) => {
  return (
    <div>
      <SectionHeading title="Offers" center noMargin />

      <div className="grid grid-cols-3 gap-4 mt-10 sm:grid-cols-3">
        <Link href={image1.href} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_800' + image1.src}
              alt={image1.alt}
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <Link href={image2.href} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_800' + image2.src}
              alt={image2.alt}
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <Link href={image3.href} passHref>
          <a target="_blank" className="col-span-3 overflow-hidden sm:col-span-1 rounded-xl">
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_800' + image3.src}
              alt={image3.alt}
              width={600}
              height={350}
              objectFit="cover"
              className="rounded-xl"
            />
          </a>
        </Link>
        <ProductHighlight backgroundSrc={packageHighlightBackground} sale={sale} />
      </div>
    </div>
  );
};
