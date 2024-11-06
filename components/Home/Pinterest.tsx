import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';

type Props = {
  isMobile: string | boolean;
};

const Pinterest = ({ isMobile }: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 my-28 xl:my-40 xl:px-20">
      <div className="flex flex-col xl:flex-row">
        <div className="w-full mb-6 xl:mb-0 xl:w-3/4">
          <HomeSectionTitle className="text-left">
            <HomeSectionTitle.MainTitle>
              From Pinterest to{isMobile === 'true' ? <br /> : ' '}
              <span className="text-[#F5296E]">your home</span>
            </HomeSectionTitle.MainTitle>
            {isMobile !== 'true' && (
              <HomeSectionTitle.Description align="left">
                Inspiration tucked away in Pinterest Boards? Connect and shop everything you love from your pins.
              </HomeSectionTitle.Description>
            )}
          </HomeSectionTitle>
        </div>
        <button
          className="flex items-center w-full h-32 p-4 border border-red-400  rounded-xl max-w-[375px]"
          onClick={() => {
            PushEvent({
              category: `Connect Pinterest`,
              action: `Go to Pinterest Connect`,
              label: `HP Connect Pinterest Button`,
            });
            location.href = '/pinterest/search';
          }}
        >
          <div className="flex-grow-0">
            <span className="sr-only">Pinterest</span>
            <svg className="text-red-400 h-11 w-11" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4l28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5l-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9l-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z" />
            </svg>
          </div>
          <div className="flex-grow text-left">
            <h3 className="ml-2 text-2xl text-red-400">Connect Now!</h3>
          </div>
          <div className="flex items-center justify-center w-10 h-10 col-span-2 bg-red-400 rounded-full justify-self-end">
            <ArrowRightIcon className="inline w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Pinterest;
