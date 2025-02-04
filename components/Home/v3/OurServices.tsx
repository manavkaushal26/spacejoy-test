import { Button } from '@components/Button';
import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { cloudinary } from '@utils/config';
import { classNames } from '@utils/helpers';
import { ourServicesData } from '@utils/Mocks/home-v3/Services';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

export const ImageWrapperStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.25s ease-in-out, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  img {
    max-width: 100%;
    max-height: 100%;
  }
  &.active {
    opacity: 1;
    transform: scale(1);
  }
  &.inactive {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const OurServices = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    onInit: () => {
      setCurrentIndex(1);
    },
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex + 1);
    },
  };

  const getCTAText = (index: number) => {
    return ourServicesData[index - 1]?.cta || null;
  };

  const getCTAHref = (index: number) => {
    return ourServicesData[index - 1]?.href || null;
  };

  return (
    <div className="relative w-full h-full mt-16 overflow-hidden bg-spj-red-light/50 sm:mt-24">
      <MaxWidthContainer className="z-10 py-16 sm:py-24">
        <SectionHeading
          // preText="Work Procedure"
          preText={
            <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-rose-100 to-rose-300 w-fit">
              <LightningBoltIcon className="w-8 h-8 text-rose-500" />
            </div>
          }
          title="How Spacejoy Works"
          subTitle="Grab a seat and get cozy, while we take care of the hard part."
          center
          noMargin
        />
        <BaseCard
          className="!p-0"
          containerClassName="mt-12 overflow-hidden rounded-[0.5rem] md:rounded-[1rem] border-none"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 relative">
            <div className="order-2 lg:order-1 px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
              <Slider
                ref={(slider) => {
                  sliderRef.current = slider;
                }}
                {...settings}
              >
                {ourServicesData.map((service) => (
                  <div key={service.id} className="relative">
                    <div className="relative aspect-[1.61/1] lg:hidden rounded-[0.5rem] overflow-hidden">
                      <Image
                        src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_1000,e_sharpen/${service.imgSrc}`}
                        alt={service.title}
                        layout="fill"
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-4 mt-8 lg:mt-0">
                      <div className="flex items-center space-x-4">
                        <div
                          className={classNames(
                            'w-10 h-10 md:w-16 md:h-16 font-bold rounded-full flex items-center justify-center bg-spj-red/5 text-3xl text-spj-red'
                          )}
                        >
                          {service.id}
                        </div>
                        <h3 className="md:hidden text-xl font-semibold md:text-2xl text-spj-red">{service.title}</h3>
                      </div>

                      <div>
                        <div>
                          <h3 className="text-xl font-semibold md:text-2xl text-spj-red hidden md:block">
                            {service.title}
                          </h3>
                          <p className="max-w-xl mt-2 text-xl">{service.subTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              {getCTAHref(currentIndex) !== null && getCTAText(currentIndex) !== null && (
                <div className="pl-0 mt-6 md:mt-10 md:pl-20">
                  <Link href={getCTAHref(currentIndex)} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <Button size="md" className="text-sm hover:opacity-90 transition-all duration-200">
                        {getCTAText(currentIndex)} <ArrowRightIcon className="w-4 h-4" />
                      </Button>
                    </a>
                  </Link>
                </div>
              )}
              <div className="flex items-center justify-center pl-0 mt-6 space-x-4 md:justify-start md:pl-20">
                <ArrowLeftIcon
                  className="w-6 h-6 transition-all duration-200 cursor-pointer md:w-8 md:h-8 hover:text-spj-red"
                  onClick={previous}
                />
                <ArrowRightIcon
                  className="w-6 h-6 transition-all duration-200 cursor-pointer md:w-8 md:h-8 hover:text-spj-red"
                  onClick={next}
                />
              </div>
            </div>

            <div className="order-1 w-full lg:order-2 relative lg:block hidden">
              {ourServicesData.map((service, i) => (
                <ImageWrapperStyled
                  key={`image-${service.id}`}
                  className={classNames(
                    currentIndex && currentIndex === service.id ? 'active' : 'inactive',
                    'w-full aspect-[1.5/1]'
                  )}
                >
                  <div className="relative w-full mx-auto h-full">
                    <Image
                      src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_1000,e_sharpen/${service.imgSrc}`}
                      alt={service.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-r-[0.5rem] md:rounded-r-[1rem]"
                    />
                  </div>
                </ImageWrapperStyled>
              ))}
            </div>
          </div>
        </BaseCard>
      </MaxWidthContainer>
    </div>
  );
};

export default OurServices;
