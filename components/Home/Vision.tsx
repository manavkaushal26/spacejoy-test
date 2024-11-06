import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import Image from 'next/image';

type Props = {};

const Vision = (props: Props) => {
  return (
    <>
      {/* Mobile */}
      <div className="container block px-4 mx-auto mt-12 mt-16 mb-6 sm:mt-32 sm:mb-12 lg:hidden">
        <HomeSectionTitle className="text-center capitalize">
          <HomeSectionTitle.MainTitle>
            <span className="capitalize">Bring your vision to life</span>
            <br />
            <span className="capitalize">in three simple steps</span>
          </HomeSectionTitle.MainTitle>
        </HomeSectionTitle>
        <div className="mt-12">
          <div className="grid grid-cols-1 text-center step">
            <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
              1
            </div>
            <div className="col-span-3">
              <h2 className="text-xl text-center capitalize">Share your vision</h2>
              <p className="mt-2 text-center">Upload photos of your home and tell us your needs.</p>
            </div>
          </div>
        </div>
        <div className="my-auto text-center ">
          <Image
            height="200"
            width="200"
            alt="path"
            src="https://res.cloudinary.com/spacejoy/image/upload/v1652948829/Vector_2_xztpty.svg"
            className="rotate-270"
          />
        </div>
        <div className="">
          <div className="grid grid-cols-1 text-center step">
            <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
              2
            </div>
            <div className="col-span-3">
              <h2 className="text-xl text-center capitalize">Get a personalized design</h2>
              <p className="mt-2 text-center">
                Consult 1:1 with a professional designer to create spaces that match your vision.
              </p>
            </div>
          </div>
        </div>
        <div className="my-auto mt-4 text-center">
          <Image
            height="200"
            width="200"
            alt="path"
            src="https://res.cloudinary.com/spacejoy/image/upload/v1652948828/Vector_1_mxl10d.svg"
            className="rotate-90"
          />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 text-center step">
            <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
              3
            </div>
            <div className="col-span-3">
              <h2 className="text-xl text-center capitalize">Shop your favorites</h2>
              <p className="mt-2 text-center">
                Get a comprehensive shopping list of all the products curated just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="container hidden px-4 mx-auto mt-16 mb-6 xl:px-20 lg:mt-28 xl:mt-36 sm:mb-12 lg:block">
        <div className="w-3/4 mx-auto">
          <HomeSectionTitle className="text-center">
            <HomeSectionTitle.MainTitle>
              <span className="">Bring your vision to life</span>
              <br />
              <span className="">in three simple steps</span>
            </HomeSectionTitle.MainTitle>
          </HomeSectionTitle>
        </div>
        <div className="w-full xl:w-3/4 bg-white flex justify-between h-[500px] mt-12 mx-auto bg-vector bg-contain bg-no-repeat bg-center grid grid-cols-4">
          <div className="flex items-center justify-center col-span-2">
            <div className="flex max-w-[370px] py-2 bg-white translate-y-[40px]">
              <div className="basis-1/4">
                <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold">
                  1
                </div>
              </div>
              <div className="ml-2">
                <p className="mb-2 text-2xl font-bold">Share your vision</p>
                <p>Upload photos of your home and tell us your needs.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center col-span-2">
            <div className="flex items-center justify-center col-span-2">
              <div className="flex max-w-[370px] py-2 bg-white">
                <div className="basis-1/4">
                  <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold">
                    2
                  </div>
                </div>
                <div className="ml-2">
                  <p className="mb-2 text-2xl font-bold">Get a personalized design</p>
                  <p>Consult 1:1 with a professional designer to create spaces that match your vision.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-center col-span-4">
            <div className="flex items-center justify-center col-span-2 ">
              <div className="flex max-w-[370px] py-2 bg-white translate-y-[48px]">
                <div className="basis-1/4">
                  <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold ">
                    3
                  </div>
                </div>
                <div className="ml-2">
                  <p className="mb-2 text-2xl font-bold">Shop your favorites</p>
                  <p>Get a comprehensive shopping list of all the products curated just for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vision;
