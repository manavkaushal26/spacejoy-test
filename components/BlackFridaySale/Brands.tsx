import SectionHeading from '@components/EcommercePage/SectionHeading';
import Image from 'next/image';

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

export const Brands = () => {
  return (
    <div className="mb-8">
      <SectionHeading title="Black Friday Brand Deals" center noMargin />
      <div className="grid grid-cols-2 gap-6 mt-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
        {whiteLabelBrandLogos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow aspect-[2/1]"
          >
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_195' + logo.src}
              alt={`${logo.name} logo`}
              layout="intrinsic"
              width={130}
              height={65}
              objectFit="contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};
