import SectionHeading from '@components/EcommercePage/SectionHeading';
import { oldSpacejoyUrl } from '@utils/config';
import Link from 'next/link';

export const Showcase = () => {
  return (
    <div className="p-12 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="mb-8 text-center sm:mb-12 ">
        <SectionHeading title="Make the Most of Black Friday Offers" center noMargin />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col text-left items-left">
          <div className="mb-4 text-5xl font-bold text-gray-300 sm:text-6xl">1.</div>
          <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">Show us your room, set your budget</h3>
          <p className="text-gray-600">
            Right after you pick a design package, apply code <span className="font-bold">BLACKFRIDAY</span> to get 35%
            off
          </p>
        </div>

        <div className="flex flex-col text-left items-left">
          <div className="mb-4 text-5xl font-bold text-gray-300 sm:text-6xl">2.</div>
          <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            See your room in 3D, with handpicked products
          </h3>
          <p className="text-gray-600">Move, swap and see the products in your design with a touch of a finger</p>
        </div>

        <div className="flex flex-col text-left items-left">
          <div className="mb-4 text-5xl font-bold text-gray-300 sm:text-6xl">3.</div>
          <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">Shop your design, Get Discounts</h3>
          <p className="text-gray-600">
            Get up to <span className="font-bold">50% off</span> on your favorite brands. There won&apos;t be any
            leftovers
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href={oldSpacejoyUrl + '/new-project'}>
          <a target="_blank" rel="noopener noreferrer">
            <button className="w-full px-6 py-3 text-base font-bold text-white bg-black rounded-lg sm:w-auto sm:px-8 sm:py-4 sm:text-lg ">
              START YOUR PROJECT →
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Showcase;
