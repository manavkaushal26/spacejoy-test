import { Button } from '@components/Button';
import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { cloudinary } from '@utils/config';
import { classNames, parseHtmlWithDOMParser } from '@utils/helpers';
import { ourServicesData } from '@utils/Mocks/home-v3/Services';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

export const SampleImageStyled = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

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
  @media (max-width: 576px) {
    margin-top: 0;
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
          title="How this Works"
          subTitle="Grab a seat and get cozy, while we take care of the hard part."
          center
          noMargin
        />
        <BaseCard className="px-4 py-8 sm:px-8 sm:py-12" containerClassName="mt-12 overflow-visible">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-40">
            <div className="order-2 -mt-16 sm:mt-0 lg:order-1 lg:col-span-2 slider-container">
              <Slider
                ref={(slider) => {
                  sliderRef.current = slider;
                }}
                {...settings}
              >
                {ourServicesData.map((service) => (
                  <div key={service.id} className="relative">
                    <div className="flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                      <div
                        className={classNames(
                          'p-4 px-6 font-bold rounded-full w-fit bg-spj-red/5 text-3xl md:text-4xl text-spj-red'
                        )}
                      >
                        {service.id}
                      </div>
                      <div>
                        <div>
                          <h3 className="text-xl font-semibold md:text-2xl text-spj-red">{service.title}</h3>
                          <p className="text-sm text-gray-500 md:text-base">{service.subTitle}</p>
                          <div
                            className="w-full max-w-full mt-4 text-sm md:max-w-3xl md:text-base"
                            dangerouslySetInnerHTML={{ __html: parseHtmlWithDOMParser(service.description) }}
                          />
                        </div>
                        {/* <div className="mt-5">
                          {service.cta && service.href && service.Icon && (
                            <Link href={service.href} passHref>
                              <a target="_blank" rel="noopener noreferrer">
                                <Button size="sm">
                                  {service.cta} <service.Icon className="w-4 h-4" />
                                </Button>
                              </a>
                            </Link>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              {getCTAHref(currentIndex) !== null && getCTAText(currentIndex) !== null && (
                <div className="pl-0 mt-6 md:mt-10 md:pl-20">
                  <Link href={getCTAHref(currentIndex)} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <Button>
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

            <div className="order-1 lg:justify-center lg:flex lg:order-2">
              <SampleImageStyled className="h-[250px]">
                {ourServicesData.map((service, i) => (
                  <ImageWrapperStyled
                    key={`image-${service.id}`}
                    className={classNames(
                      currentIndex && currentIndex === service.id ? 'active' : 'inactive',
                      'w-full lg:right-80 lg:-top-20'
                    )}
                  >
                    <div className="relative w-full max-w-sm md:max-w-none md:w-[530px] mx-auto aspect-[1.6/1]">
                      <Image
                        src={`${cloudinary.baseDeliveryURL}/fl_lossy,q_auto,w_1000,e_sharpen/${service.imgSrc}`}
                        alt={service.title}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </ImageWrapperStyled>
                ))}
              </SampleImageStyled>
            </div>
          </div>
        </BaseCard>
      </MaxWidthContainer>
    </div>
  );
};

export default OurServices;
