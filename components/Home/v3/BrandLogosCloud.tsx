import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

const whiteLabelBrandLogos = [
  {
    name: 'Luna & Luxe',
    href: 'luna-luxe-furniture-decor',
    src: '/v1732122668/spj-v2/home-v3/Brand%20Logos/LunaLuxe_Transparent_wq9lia.webp',
  },
  {
    name: 'Harper Studios',
    href: 'harper-studios-furniture-decor',
    src: '/v1732122853/spj-v2/home-v3/Brand%20Logos/HarperStudios_v4v2jg.webp',
  },
  {
    name: 'Empyrean Living',
    href: 'empyrean-living-furniture-decor',
    src: '/v1732123007/spj-v2/home-v3/Brand%20Logos/EmpyreanLiving_w1gius.webp',
  },
  {
    name: 'Aurora Home',
    href: 'aurora-home',
    src: '/v1732123038/spj-v2/home-v3/Brand%20Logos/AuroraHome_yum7nq.webp',
  },
  {
    name: 'Thread & Thistle',
    href: 'thread-thistle',
    src: '/v1733316983/spj-v2/home-v3/Brand%20Logos/thread_thistle_fyohid.webp',
  },
  {
    name: 'Urban Nova',
    href: 'urban-nova',
    src: '/v1733317375/spj-v2/home-v3/Brand%20Logos/urban_nova_raaxbk.webp',
  },
];

const BrandLogosCloud = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
      <MaxWidthContainer className="py-12 sm:py-16 mt-16 sm:mt-24">
        <p className="mb-10 text-base font-semibold text-center capitalize lg:text-xl lg:mx-auto">
          Boutique brands curated just for you
        </p>
        <Slider {...settings}>
          {whiteLabelBrandLogos.map((logo) => (
            <Link href={'https://store.spacejoy.com/collections/' + logo.href} key={logo.name}>
              <a target="_blank" rel="noopener noreferrer">
                <div className="relative !block !w-[100px] md:!w-[130px] !mx-auto aspect-[2/1]">
                  <Image
                    src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_195' + logo.src}
                    alt={logo.name + '_logo'}
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>
              </a>
            </Link>
          ))}
        </Slider>
      </MaxWidthContainer>
    </div>
  );
};

export default BrandLogosCloud;
