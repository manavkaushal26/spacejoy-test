import SectionHeading from '@components/EcommercePage/SectionHeading';
import FadeInFadeOut from '@components/Shared/FadeInFadeOut';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { Tab } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { cloudinary } from '@utils/config';
import { classNames } from '@utils/helpers';
import categoriesData from '@utils/Mocks/home-v3/Categories';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

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
          preText={
            <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-purple-100 to-purple-300 w-fit">
              <ShoppingCartIcon className="w-8 h-8 text-purple-500" />
            </div>
          }
          title="Boutique, Budget and Big Brands. All under one roof."
          subTitle="Enjoy store credits with every design"
          center
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
                            <p className="px-1 text-xs sm:px-2 md:text-base text-zinc-500 line-clamp-2">
                              {post.description}
                            </p>
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
                            <div className="relative w-full aspect-[1] rounded-xl md:rounded-[1.6rem] overflow-hidden shadow bg-rose-50 flex flex-col items-center justify-center font-semibold text-xs md:text-sm text-gray-500 text-center bg-pattern">
                              All Products Under
                              <span className="flex items-center space-x-2 text-xl capitalize md:text-4xl text-spj-red">
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
