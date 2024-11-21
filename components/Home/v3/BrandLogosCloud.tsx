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

const BrandLogosCloud = () => {
  return (
    <>
      <p className="mt-16 mb-8 text-base font-semibold text-center lg:text-xl lg:mx-auto">
        Trusted by the world&apos;s most innovative teams
      </p>
      <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
        {whiteLabelBrandLogos.map((logo) => (
          <div key={logo.name}>
            <Image
              src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto' + logo.src}
              alt={logo.name + '_logo'}
              width={158}
              height={48}
              layout="responsive"
              className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BrandLogosCloud;
