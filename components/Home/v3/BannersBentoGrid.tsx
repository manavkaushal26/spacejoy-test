import Image from 'next/image';

const BannersBentoGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-10 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      <div className="lg:col-span-4">
        <div className="overflow-hidden rounded-lg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] h-full shadow-md transition-all duration-200">
          <div className="relative w-full h-full">
            <Image
              alt="banner 1"
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1000/v1656677852/spj-v2/Summer_design_01-_Camera_1_1_-min_yz83hj.png"
              className="object-cover"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-lg lg:rounded-tr-[2rem] h-full shadow-md transition-all duration-200">
          <div className="relative w-full h-full">
            <Image
              alt="banner 2"
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_740/v1650949830/web/homepage-v3/Homepage_xwarfz.png"
              className="object-cover"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-lg lg:rounded-bl-[2rem] h-full shadow-md transition-all duration-200">
          <div className="relative w-full h-full">
            <Image
              alt="banner 3"
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_740/v1644563441/web/homepage-v3/signup_login_n8auva.jpg"
              className="object-cover"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="overflow-hidden rounded-lg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] h-80 shadow-md transition-all duration-200">
          <div className="relative w-full h-full">
            <Image
              alt="banner 3"
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1000/v1650888598/web/homepage-v3/New-Website-Banner-1_1_rxuidx.jpg"
              className="object-cover"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannersBentoGrid;
