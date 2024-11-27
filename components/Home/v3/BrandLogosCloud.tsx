import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import Image from 'next/image';
import Slider from 'react-slick';

const whiteLabelBrandLogos = [
  {
    name: 'Luna & Luxe',
    src: '/v1732122668/spj-v2/home-v3/Brand%20Logos/LunaLuxe_Transparent_wq9lia.webp',
  },
  {
    name: 'Harper Studios',
    src: '/v1732122853/spj-v2/home-v3/Brand%20Logos/HarperStudios_v4v2jg.webp',
  },
  {
    name: 'Empyrean Living',
    src: '/v1732123007/spj-v2/home-v3/Brand%20Logos/EmpyreanLiving_w1gius.webp',
  },
  {
    name: 'Aurora Home',
    src: '/v1732123038/spj-v2/home-v3/Brand%20Logos/AuroraHome_yum7nq.webp',
  },
  {
    name: 'Thread & Thistle',
    src: '/v1732123173/spj-v2/home-v3/Brand%20Logos/ThreadThistle_g6oyou.webp',
  },
  {
    name: 'Urban Nova',
    src: '/v1732123169/spj-v2/home-v3/Brand%20Logos/UrbanNova_e39ztz.webp',
  },
];

const BrandLogosCloud = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-500/5 bg-pattern">
      <MaxWidthContainer className="!py-16">
        <p className="mb-10 text-base font-semibold text-center lg:text-xl lg:mx-auto">
          Trusted by the world&apos;s most innovative teams
        </p>
        <Slider {...settings}>
          {whiteLabelBrandLogos.map((logo) => (
            <div key={logo.name} className="relative !block !w-[100px] md:!w-[130px] !mx-auto aspect-[2/1]">
              <Image
                src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_195' + logo.src}
                alt={logo.name + '_logo'}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          ))}
        </Slider>
      </MaxWidthContainer>
    </div>
  );
};

export default BrandLogosCloud;
