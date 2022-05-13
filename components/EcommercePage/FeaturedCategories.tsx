import React from 'react';
import SectionHeading from './SectionHeading';
import Masonry from 'react-responsive-masonry';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { convertFilterToUrlPath, convertUrlPathToFilter } from '@utils/helpers';

const FeaturedCategoriesGrid = styled.div`
  .grid {
    display: grid;
    grid-auto-flow: row dense;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 16px 16px;
    grid-template-areas:
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div1 div1 div1 div1 div1 div1 container1 container1 container1 container2 container2 container2'
      'div6 div6 div6 div6 div6 div6 div8 div8 div8 div8 div8 div8'
      'div6 div6 div6 div6 div6 div6 div8 div8 div8 div8 div8 div8'
      'div6 div6 div6 div6 div6 div6 div8 div8 div8 div8 div8 div8'
      'div7 div7 div7 div7 div7 div7 div8 div8 div8 div8 div8 div8'
      'div7 div7 div7 div7 div7 div7 div8 div8 div8 div8 div8 div8'
      'div7 div7 div7 div7 div7 div7 div8 div8 div8 div8 div8 div8';
    justify-items: stretch;
  }
  .div1 {
    grid-area: div1;
  }
  .container1 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.3fr 1fr;
    gap: 16px 16px;
    grid-template-areas:
      'div2'
      'div3'
      'div3';
    grid-area: container1;
  }
  .div2 {
    grid-area: div2;
  }
  .div3 {
    grid-area: div3;
  }
  .container2 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.3fr 1fr;
    gap: 16px 16px;
    grid-template-areas:
      'div4'
      'div4'
      'div5';
    grid-area: container2;
  }
  .div4 {
    grid-area: div4;
  }
  .div5 {
    grid-area: div5;
  }
  .div6 {
    grid-area: div6;
  }
  .div7 {
    grid-area: div7;
  }
  .div8 {
    grid-area: div8;
  }
  @media (max-width: 640px) {
    .grid {
      display: grid;
      grid-auto-flow: row dense;
      grid-auto-columns: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 16px 16px;
      grid-template-areas:
        'container1 container2'
        'container1 container2'
        'container1 container2';
      justify-items: stretch;
    }
    .div1,
    .div6,
    .div7,
    .div8 {
      display: none;
    }
    .div2 {
      height: 200px;
    }
  }
`;

const FeaturedCategories = ({ mobile }) => {
  return (
    <div className="container max-w-7xl px-4 mx-auto">
      <SectionHeading title="Featured Categories" />
      <FeaturedCategoriesGrid>
        <div className="grid">
          <div className="div1 relative aspect-1">
            <Link href="shop?subcategory=sofas" passHref>
              <a target={!mobile ? '_blank' : ''}>
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652191607/web/furniture-decor-shop/V2/Sofas_vmnho9.jpg"
                  alt="Sofas"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl w-full block"
                />
                <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                  Sofas
                </p>
              </a>
            </Link>
          </div>
          <div className="container1">
            <div className="div2 relative">
              <Link href="shop?subcategory=chairs" passHref>
                <a target={!mobile ? '_blank' : ''}>
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652191663/web/furniture-decor-shop/V2/Chairs_tmn1ao.jpg"
                    alt="Chairs"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl w-full block"
                  />
                  <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                    Chairs
                  </p>
                </a>
              </Link>
            </div>
            <div className="div3 relative">
              <Link href="/media-consoles" passHref>
                <a target={!mobile ? '_blank' : ''}>
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652191821/web/furniture-decor-shop/V2/Tv_Console_fotmok.jpg"
                    alt="TV Console"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl w-full block"
                  />
                  <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                    TV Console
                  </p>
                </a>
              </Link>
            </div>
          </div>
          <div className="container2">
            <div className="div4 relative">
              <Link href="/shop?subcategory=tables" passHref>
                <a target={!mobile ? '_blank' : ''}>
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652191430/web/furniture-decor-shop/V2/Tables_m1zuz2.jpg"
                    alt="Tables"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl w-full block"
                  />
                  <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                    Tables
                  </p>
                </a>
              </Link>
            </div>
            <div className="div5 relative">
              <Link href="/shop?subcategory=Storage-Organizers" passHref>
                <a target={!mobile ? '_blank' : ''}>
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652192080/web/furniture-decor-shop/V2/Storage_and_Organisers_lcvqh2.jpg"
                    alt="Storage and Organizers"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl w-full block"
                  />
                  <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                    Storage and Organizers
                  </p>
                </a>
              </Link>
            </div>
          </div>
          <div className="div6 relative">
            <Link href="/shop?subcategory=rugs" passHref>
              <a target={!mobile ? '_blank' : ''}>
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652190748/web/furniture-decor-shop/V2/Rugs_czamhg.jpg"
                  alt="Rugs"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl w-full block"
                />
                <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                  Rugs
                </p>
              </a>
            </Link>
          </div>
          <div className="div7 relative">
            <Link href="/lamps-&-shades" passHref>
              <a target={!mobile ? '_blank' : ''}>
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652191959/web/furniture-decor-shop/V2/Lamps_and_Shades_ndt9jw.jpg"
                  alt="Lamps & Shades"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl w-full block"
                />
                <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                  Lamps & Shades
                </p>
              </a>
            </Link>
          </div>
          <div className="div8 relative aspect-1">
            <Link href="/shop?subcategory=Beds" passHref>
              <a target={!mobile ? '_blank' : ''}>
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652192121/web/furniture-decor-shop/V2/Beds_wxnkdh.jpg"
                  alt="Beds"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl w-full block"
                />
                <p className="absolute bottom-2 text-white text-xl font-semibold w-full text-center sm:text-2xl lg:text-3xl sm:bottom-6 lg:bottom-10">
                  Beds
                </p>
              </a>
            </Link>
          </div>
        </div>
      </FeaturedCategoriesGrid>
    </div>
  );
};

export default FeaturedCategories;
