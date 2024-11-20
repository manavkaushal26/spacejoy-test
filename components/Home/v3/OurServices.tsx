import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { classNames } from '@utils/helpers';
import { OurServicesData } from '@utils/Mocks/home-v3/Services';
import Image from 'next/image';
import { useRef, useState } from 'react';
import HtmlParser from 'react-html-parser';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

type Props = {};

const SampleImageStyled = styled.div`
  position: relative;
  /* height: 400px; */
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    height: 250px;
  }
`;

const ImageWrapperStyled = styled.div`
  position: absolute;
  top: -6rem;
  right: 0.5rem;
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

const backgrounds = {
  1: '#C5C9FF', // #C5C9FF
  2: 'bg-red-100', // bg-red-100
  3: 'bg-yellow-100', // bg-yellow-100
  4: 'bg-blue-100', // bg-blue-100
  5: 'bg-rose-100', // bg-rose-100
  6: 'bg-violet-100', // bg-violet-100
  7: 'bg-pink-100', // bg-pink-100
  8: 'bg-purple-100', // bg-purple-100
};

const OurServices = (props: Props) => {
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
    autoplaySpeed: 3000,
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

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg
        id="wave"
        // style="transform:rotate(0deg); transition: 0.3s"
        viewBox="0 0 2560 625"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 -z-10 -top-16"
        style={{ height: '1000px' }}
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(250, 250, 250, 0.5)" offset="0%" />
            <stop stopColor="rgba(242, 242, 242, 0.5)" offset="100%" />
          </linearGradient>
        </defs>
        <path
          // style="transform:translate(0, 0px); opacity:1"
          fill="url(#sw-gradient-0)"
          d="M0,196L120,171.5C240,147,480,98,720,114.3C960,131,1200,212,1440,236.8C1680,261,1920,229,2160,212.3C2400,196,2640,196,2880,228.7C3120,261,3360,327,3600,334.8C3840,343,4080,294,4320,228.7C4560,163,4800,82,5040,114.3C5280,147,5520,294,5760,359.3C6000,425,6240,408,6480,383.8C6720,359,6960,327,7200,318.5C7440,310,7680,327,7920,334.8C8160,343,8400,343,8640,326.7C8880,310,9120,278,9360,269.5C9600,261,9840,278,10080,277.7C10320,278,10560,261,10800,220.5C11040,180,11280,114,11520,114.3C11760,114,12000,180,12240,196C12480,212,12720,180,12960,187.8C13200,196,13440,245,13680,245C13920,245,14160,196,14400,196C14640,196,14880,245,15120,245C15360,245,15600,196,15840,204.2C16080,212,16320,278,16560,269.5C16800,261,17040,180,17160,138.8L17280,98L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
        />
      </svg>
      <MaxWidthContainer className="z-10">
        <SectionHeading
          preText="Work Procedure"
          title="How Our Service Works"
          subTitle="We go beyond picking furniture. We bring your ideas together."
          noMargin
          center
        />
        <BaseCard className="sm:px-8 sm:py-12" containerClassName="mt-20 overflow-visible">
          <div className="grid grid-cols-1 gap-32 md:grid-cols-3">
            <div className="md:col-span-2 slider-container">
              <Slider
                ref={(slider) => {
                  sliderRef.current = slider;
                }}
                {...settings}
              >
                {OurServicesData.map((service) => (
                  <div key={service.id} className="relative">
                    <div className="flex items-start space-x-4">
                      <div
                        className={classNames(
                          'p-4 px-6 font-bold rounded-full w-fit bg-spj-red/5 text-4xl text-spj-red'
                        )}
                      >
                        {service.id}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-spj-red">{service.title}</h3>
                        <p className="font-semibold text-gray-500">{service.subTitle}</p>
                        <p className="w-full max-w-3xl mt-2 text-base">{HtmlParser(service.description)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="flex items-center pl-20 mt-10 space-x-4">
                <ArrowLeftIcon
                  className="w-8 h-8 transition-all duration-200 cursor-pointer hover:text-spj-red"
                  onClick={previous}
                />
                <ArrowRightIcon
                  className="w-8 h-8 transition-all duration-200 cursor-pointer hover:text-spj-red"
                  onClick={next}
                />
              </div>
            </div>
            <div>
              <SampleImageStyled>
                {OurServicesData.map((service, i) => (
                  <ImageWrapperStyled
                    key={`image-${service.id}`}
                    className={currentIndex && currentIndex === service.id ? 'active' : 'inactive'}
                  >
                    <div className="relative w-[500px] aspect-[1.85/1]">
                      <Image
                        // src={`c_scale,q_100,w_900/${service.imgSrc}`}
                        src={service.imgSrc}
                        alt={service.title}
                        className="object-contain"
                        layout="fill"
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
