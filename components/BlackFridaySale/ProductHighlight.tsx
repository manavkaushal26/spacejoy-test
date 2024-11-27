export const ProductHighlight = () => {
  return (
    <div
      className="relative col-span-3 bg-cover bg-center text-white py-12 px-4 rounded-xl"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/spacejoy/image/upload/v1732694005/spj-v2/Black-Friday-sale/DElight_5_kc3zjo.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 place-items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">DELIGHT</h2>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Price: <span className="line-through text-gray-200">$149</span>
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Deal Price: <span className="text-[#e6bc63]">$149</span>
          </p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">BLISS</h2>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Price: <span className="line-through text-gray-200">$299</span>
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Deal Price: <span className="text-[#e6bc63]">$229</span>
          </p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">EUPHORIA</h2>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Price: <span className="line-through text-gray-200">$399</span>
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Deal Price: <span className="text-[#e6bc63]">$299</span>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e6bc63]">+35%</h2>
          <p className="text-base sm:text-xl mb-4">The best time to design and shop</p>
          <button className="mt-4 bg-[#e6bc63] text-black px-6 py-3 rounded-lg font-bold">START YOUR PROJECT →</button>
        </div>
      </div>
    </div>
  );
};
