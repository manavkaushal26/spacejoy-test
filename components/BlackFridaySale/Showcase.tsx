import SectionHeading from '@components/EcommercePage/SectionHeading';

export const Showcase = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-12">
      <div className="text-center mb-8 sm:mb-12 ">
        <SectionHeading title="Make the Most of Black Friday Offers" center noMargin />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-left text-left">
          <div className="text-5xl sm:text-6xl font-bold text-gray-300 mb-4">1.</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Show us your room, set your budget</h3>
          <p className="text-gray-600">
            Right after you pick a design package, apply code <span className="font-bold">BLACKFRIDAY</span> to get 35%
            off
          </p>
        </div>

        <div className="flex flex-col items-left text-left">
          <div className="text-5xl sm:text-6xl font-bold text-gray-300 mb-4">2.</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            See your room in 3D, with handpicked products
          </h3>
          <p className="text-gray-600">Move, swap and see the products in your design with a touch of a finger</p>
        </div>

        <div className="flex flex-col items-left text-left">
          <div className="text-5xl sm:text-6xl font-bold text-gray-300 mb-4">3.</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Shop your design, Get Discounts</h3>
          <p className="text-gray-600">
            Get up to <span className="font-bold">50% off</span> on your favorite brands. There won&apos;t be any
            leftovers
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg font-bold rounded-lg ">
          START YOUR PROJECT →
        </button>
      </div>
    </div>
  );
};

export default Showcase;
