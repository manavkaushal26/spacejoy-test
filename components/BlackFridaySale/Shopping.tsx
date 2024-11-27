import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/MaxWidthContainer';
import FadeInFadeOut from '@components/Shared/FadeInFadeOut';
import { Tab } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { cloudinary } from '@utils/config';
import { classNames } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

const categoriesData = {
  sofas: [
    {
      id: 1,
      title: 'Sectionals',
      subTitle: '',
      description:
        'listen hurried independent control truck beautiful hole adjective naturally third brush send combine want contain cut cool purple team planning am origin sang toward',
      href: 'sofas?filter.p.product_type=Sectionals',
      imageUrl: '/v1732606527/spj-v2/home-v3/sectional_sofas_w7jggn.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Sofas & Sofa Bed',
      subTitle: '',
      description:
        'root fell cell clothes her raise active per attack author plane children blew loose moment exist eaten whenever earn pond greater establish exchange whatever',
      href: 'sofas?filter.p.product_type=Sofas&filter.p.product_type=Sofa+Bed',
      imageUrl: '/v1732606970/spj-v2/home-v3/sofa_beds_and_sofas_wm0pif.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'Loveseats & Settees',
      subTitle: '',
      description:
        'thin affect exercise job happen factory necessary think glass ruler raise transportation stomach sand wooden dress police driving pan against aloud office can person',
      href: 'sofas?filter.p.product_type=Loveseats+%26+Settees',
      imageUrl: '/v1732607566/spj-v2/home-v3/loveseats_and_settees_sofas_zb2e3t.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
  beds: [
    {
      id: 1,
      title: 'King Beds',
      subTitle: '',
      description:
        'who snake provide late me ride wind certain fallen difficulty story return had feature play mainly captured promised proper wolf job sound own phrase',
      href: 'beds?filter.p.product_type=King+Beds',
      imageUrl: '/v1732611696/spj-v2/home-v3/king_beds_1_muzzmn.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Queen Beds',
      subTitle: '',
      description:
        'sugar require steam free ice broke film it cool kill least airplane area finally activity carried social listen rubber was find electric door riding',
      href: 'beds?filter.p.product_type=Queen+Beds',
      imageUrl: '/v1732594809/spj-v2/home-v3/queen_beds_xfttsy.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'Full/Double Beds',
      subTitle: '',
      description:
        'labor blind officer coach medicine shinning excited hello sheep kill declared remarkable particularly gently high built onto agree nodded task bad pale society wall',
      href: 'beds?filter.p.product_type=Full%2FDouble+Beds',
      imageUrl: '/v1732612079/spj-v2/home-v3/full_double_beds_1_qako3x.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
  chairs: [
    {
      id: 1,
      title: 'Accent Chairs',
      subTitle: '',
      description:
        'then recent wealth opportunity third faster additional camp cover kids heavy fence harder brown hurried country according mud valuable drawn combination no major duty',
      href: 'chairs?filter.p.product_type=Accent+Chairs',
      imageUrl: '/v1732617996/spj-v2/home-v3/accent_chairs_a9ithe.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Dining Chairs',
      subTitle: '',
      description:
        'three bus brick straight sang composition thou tall period voyage adult satisfied table health sentence familiar exactly bat count sight telephone safe lucky deeply',
      href: 'chairs?filter.p.product_type=Dining+Chairs',
      imageUrl: '/v1732618114/spj-v2/home-v3/dining_chairs_pjdwnw.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'Bar Stools & Benches',
      subTitle: '',
      description:
        'screen board changing tales spin chapter than pattern eager system enter income top require separate prevent number claws roar six valley white change day',
      href: 'chairs?filter.p.product_type=Bar+Stools&filter.p.product_type=Benches',
      imageUrl: '/v1732618334/spj-v2/home-v3/bar_stools_and_benches_oyv7kv.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
  tables: [
    {
      id: 1,
      title: 'Coffee & Console Tables',
      subTitle: '',
      description:
        'then recent wealth opportunity third faster additional camp cover kids heavy fence harder brown hurried country according mud valuable drawn combination no major duty',
      href: 'tables?filter.p.product_type=Coffee+Tables&filter.p.product_type=Console+Tables',
      imageUrl: '/v1732618616/spj-v2/home-v3/coffee_tables_rihzt1.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Dining Tables',
      subTitle: '',
      description:
        'three bus brick straight sang composition thou tall period voyage adult satisfied table health sentence familiar exactly bat count sight telephone safe lucky deeply',
      href: 'tables?filter.p.product_type=Dining+Tables',
      imageUrl: '/v1732618744/spj-v2/home-v3/dining_tables_xbi20o.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'End & Side Tables',
      subTitle: '',
      description:
        'screen board changing tales spin chapter than pattern eager system enter income top require separate prevent number claws roar six valley white change day',
      href: 'tables?filter.p.product_type=End+%26+Side+Tables',
      imageUrl: '/v1732618834/spj-v2/home-v3/end_side_tables_iblfuh.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
  lamps: [
    {
      id: 1,
      title: 'Floor Lamps',
      subTitle: '',
      description:
        'monkey system bad colony common blank chicken furniture only depth letter forest moment major morning setting sugar exchange animal welcome donkey farmer entirely detail',
      href: 'lamps?filter.p.product_type=Floor+Lamps',
      imageUrl: '/v1732619011/spj-v2/home-v3/floor_lamps_jlvur5.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Table Lamps',
      subTitle: '',
      description:
        'unhappy vowel headed land pride putting was ever sum maybe coat article fewer law neighbor lay red bet atmosphere involved raise sides room beneath',
      href: 'lamps?filter.p.product_type=Table+Lamps',
      imageUrl: '/v1732619206/spj-v2/home-v3/table_lamps_exczbi.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'Wall Sconce',
      subTitle: '',
      description:
        'instance mail evidence wonderful paid hat mouse its aloud hung larger visit planet do solar final gentle took night getting short common running excitement',
      href: 'lamps?filter.p.product_type=Wall+Lights',
      imageUrl: '/v1732619323/spj-v2/home-v3/wall_lights_zlob3r.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
  'storage & organization': [
    {
      id: 1,
      title: 'Bookcases, Cabinets & Chests',
      subTitle: '',
      description:
        'never union as leather trail famous problem television military allow band fought block aloud rear desert clear anybody arrive smile declared old face process',
      href: 'storage-organization?filter.p.product_type=Bookcases&filter.p.product_type=Cabinets+%26+Chests',
      imageUrl: '/v1732620286/spj-v2/home-v3/bookcases_cabinets_chests_v5eggs.jpg',
      imgAspectRatio: 'aspect-[1]',
    },
    {
      id: 2,
      title: 'Sideboards & Buffets',
      subTitle: '',
      description:
        'chance principle boy parts dropped win gasoline determine fair speech longer powder standard similar fire wide center straight student solid point lungs telephone search',
      href: 'storage-organization?filter.p.product_type=Sideboards+%26+Buffets',
      imageUrl: '/v1732620777/spj-v2/home-v3/sideboards_evkckm.jpg',
      imgAspectRatio: 'aspect-[1/1.15]',
    },
    {
      id: 3,
      title: 'Tv Consoles & Entertainment Centers',
      subTitle: '',
      description:
        'fourth bound joy careful stranger daughter length biggest sat according silk heat own cloth car luck hardly feature warn national bone machine victory pay',
      href: 'storage-organization?filter.p.product_type=Tv+Consoles+%26+Entertainment+Centers',
      imageUrl: '/v1732621003/spj-v2/home-v3/tv_consoles_civssb.jpg',
      imgAspectRatio: 'aspect-[1/1.3]',
    },
  ],
};

// Tailwind Classes
// aspect-[1]
// aspect-[1/1.15]
// aspect-[1/1.3]
// aspect-[1]

const Shopping: React.FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const tabKeys = Object.keys(categoriesData);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tabKeys.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, tabKeys.length]);

  return (
    <div className="relative">
      <MaxWidthContainer className="pt-0">
        <SectionHeading
          title="Get upto 50% off on Spacejoy Boutique Brands"
          // subTitle="Enjoy store credits with every design"
          center
          noMargin
        />
        <div className="w-full mt-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <Tab.Group selectedIndex={currentIndex} onChange={setCurrentIndex}>
            {/* Tab List */}
            <Tab.List className="flex flex-wrap items-center justify-around w-full gap-2 p-2 bg-white sm:gap-4">
              {tabKeys.map((category, idx) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'font-medium outline-none transition-all duration-[500ms] border-b-2 border-transparent pb-1 text-sm md:text-base capitalize',
                      selected ? 'border-zinc-800 font-semibold' : 'hover:bg-white/[0.12]'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            {/* Tab Panels */}
            <Tab.Panels className="mt-4">
              {Object.values(categoriesData).map((posts, idx) => (
                <Tab.Panel key={idx} className="p-2 bg-white md:p-4">
                  <FadeInFadeOut>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                      {posts.map((post) => (
                        <Link key={post.id} href={`https://store.spacejoy.com/collections/${post.href}`} passHref>
                          <a
                            className="group relative p-2 sm:p-3 rounded-lg md:rounded-[2rem] hover:bg-gray-100 h-fit transition-all duration-200 focus:outline-none cursor-pointer outline-none active:outline-none"
                            target="_blank"
                          >
                            <div
                              className={classNames(
                                'relative w-full rounded-xl md:rounded-[1.6rem] overflow-hidden shadow',
                                post.imgAspectRatio
                              )}
                            >
                              <Image
                                src={cloudinary.baseDeliveryURL + '/fl_lossy,q_auto,w_500' + post.imageUrl}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-300 group-hover:scale-105"
                                priority
                              />
                            </div>
                            <h3 className="flex items-center px-1 pt-3 space-x-2 text-sm font-semibold capitalize sm:px-2 md:text-lg">
                              <span>{post.title}</span>
                              <ExternalLinkIcon className="w-5 h-5 text-spj-red" />
                            </h3>
                            {/* <p className="px-1 text-xs sm:px-2 md:text-base text-zinc-500 line-clamp-2">
                              {post.description}
                            </p> */}
                          </a>
                        </Link>
                      ))}
                      <Link
                        href={`https://store.spacejoy.com/collections/${
                          tabKeys[idx].includes('storage') ? tabKeys[idx].replace(' & ', '-') : tabKeys[idx]
                        }`}
                        passHref
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <div className="relative p-2 sm:p-3 rounded-lg md:rounded-[2rem] hover:bg-gray-100/50 h-fit transition-all duration-200 focus:outline-none cursor-pointer ">
                            <div className="relative w-full aspect-[1] rounded-xl md:rounded-[1.6rem] overflow-hidden shadow bg-black-friday bg-cover bg-no-repeat bg-right-bottom flex flex-col items-center justify-center font-semibold text-xs md:text-sm text-white text-center bg-pattern">
                              All Products Under
                              <span className="flex items-center space-x-2 text-xl capitalize md:text-4xl text-[#e6bc63]">
                                {tabKeys[idx]}
                              </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </FadeInFadeOut>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Shopping;
