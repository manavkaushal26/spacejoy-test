import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { Tab } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/helpers';
import categoriesData from '@utils/Mocks/home-v3/Categories';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {};

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
      <MaxWidthContainer>
        <SectionHeading
          preText={
            <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-purple-100 to-purple-300 w-fit">
              <ShoppingCartIcon className="w-8 h-8 text-purple-500" />
            </div>
          }
          title="Boutique, Budget and Big Brands. All under one roof."
          subTitle="Enjoy store credits with every design"
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
                      'font-medium outline-none transition-all duration-[500ms] border-b-2 border-transparent pb-1 text-sm md:text-base',
                      selected ? 'border-zinc-800 ' : 'hover:bg-white/[0.12]'
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
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="relative p-2 sm:p-3 rounded-lg md:rounded-[2rem] hover:bg-gray-100 h-fit transition-all duration-200 focus:outline-none"
                      >
                        <div className={classNames('relative w-full aspect-square', post.imgAspectRatio)}>
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md md:rounded-[1.6rem]"
                          />
                        </div>
                        <h3 className="px-1 pt-2 text-sm font-semibold capitalize sm:px-2 md:text-lg">{post.title}</h3>
                        <p className="px-1 text-xs sm:px-2 md:text-base text-zinc-500 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                    ))}
                  </div>
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
