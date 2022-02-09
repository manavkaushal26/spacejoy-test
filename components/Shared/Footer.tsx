import { company, oldSpacejoyUrl } from '@utils/config';
import Link from 'next/link';
import React from 'react';
import SocialLinks from './Footer/SocialLinks';
import spacejoyPromiseData from '@utils/Mocks/spacejoyPromises';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="antialiased border-t border-gray-200 footer">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {spacejoyPromiseData.map((promise) => (
            <div key={promise.title} className="mt-4">
              <div className="relative flex flex-col py-5 space-x-3 bg-white rounded-lg justify-left lg:flex-row lg:items-start">
                <div className="flex-shrink-0">
                  <img className="w-16 h-16 mb-2 ml-3 lg:mb-0 lg:ml-0" src={promise.img} alt={promise.title} />
                </div>
                <div className="flex-1 min-w-0 ml-0 lg:ml-2">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="mb-1 text-sm font-semibold text-gray-900">{promise.title}</p>
                  <p className="text-sm text-gray-500">{promise.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-6 gap-2 py-12">
          <div className="col-span-2 xl:w-3/4">
            <h3 className="mb-2">About Us</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Spacejoy enables a superior shopping experience by instantly allowing you to visualize your space with the
              products you want to buy. Spacejoy&apos;s professionally crafted designs sets are a great way to try
              different styles from multiple brands in a room before shopping. It&apos;s now effortless to personalize
              your home with your favorite pieces within your budget and style.
            </p>
            <SocialLinks />
          </div>
          <div className="">
            <h3 className="mb-2 ">Quick Links</h3>
            <ul>
              {/* <li>
                <Link href="${oldSpacejoyUrl}/furniture-decor-shop">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Shop
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/room-select">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/online-interior-design`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Hire a Designer
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/customer-stories`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Customer Stories
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Interior Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/purchase-gift-card`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Gift Cards
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/trending-items`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Deals Of The Day
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/style-quiz-intro`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Style Quiz
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/balance-check`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Check Card Balance
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Support</h3>
            <ul>
              <li>
                <Link href="/help">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    FAQs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Refund Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 ">Connect with us</h3>
            <ul>
              <li>
                <a
                  className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`tel:${company.phone.support}`}
                  target="_top"
                >
                  {company.phone.support}
                </a>
              </li>
              <li>
                <a
                  className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:${company.email.support}?Subject=Need%20Help`}
                  target="_top"
                >
                  {company.email.support}
                </a>
              </li>
              <li>
                <a
                  className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:hello@spacejoy.com`}
                  target="_top"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 py-12">
          <div className="">
            <h3 className="mb-2 ">Furniture & Decor Sets</h3>
            <ul>
              <li>
                <Link href="/design-sets/room/living-room-design-sets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Living Room Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/design-sets/room/bedroom-design-sets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Bedroom Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/design-sets/room/dining-room-design-sets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Dining Room Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/design-sets/room/home-office-design-sets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Home Office Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/design-sets/room/entryway-design-sets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Entryway Sets
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Design Styles</h3>
            <ul>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/modern-style-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Modern Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/eclectic-room-designs`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Eclectic Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/farmhouse-style-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Modern Farmhouse Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/industrial-room-designs`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Industrial Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/mid-century-modern-room-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Mid-Century Modern Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/transitional-style-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Transitional Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/classic-modern-design-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Contempory Modern Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `${oldSpacejoyUrl}/interior-designs/coastal-design-ideas`,
                  }}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Coastal Design Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Curated Collections</h3>
            <ul>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/spring-2020-look-book-living-room-designs-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Spring Living Room Designs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/room-select">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Spring Bedroom Designs
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/spring-2020-look-book-entryway-designs-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Spring Entryway Designs
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/bohemian-living-room-design-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Bohemian Living Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/open-living-and-dining-room-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Open Living-Dining Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/small-living-room-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Small Living Room Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/glam-design-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Glam Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs/minimalist-living-room-design-ideas`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Minimalist Living Room Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Blog</h3>
            <ul>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/popular-living-room-colors`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Best Living Room Colors
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/best-comfortable-sectionals-to-watch-tv`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    13 Best Sectional Sofas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`${oldSpacejoyUrl}/interior-designs-blog/best-mid-century-modern-interior-design-style-furniture-to-buy`}
                >
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Mid Century Modern Furniture
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/farmhouse-style-design-rules`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Farmhouse Style Decor Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/small-living-room-insp-we-love`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Small Living Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/how-to-decorate-your-living-room`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    6 Steps To Decorate Living Room
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/interior-designs-blog/minimalist-home-decor-style-guide`}>
                  <a
                    className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Minimalist Home Decor Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Products</h3>
            <ul>
              <li>
                <Link href="/shop?subcategory=Sofas">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Sofas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Tables&vertical=Coffee+Tables">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Coffee Tables
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Tables&vertical=End+%26+Side+Tables">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Side Tables
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Chairs&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Accent Chairs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Lights&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Lighting
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Mirrors&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Mirrors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Rugs&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting%3A%3ARunners%3A%3AOther+Rugs%3A%3AArea+Rugs">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Rugs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Storage+Containers&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting%3A%3ARunners%3A%3AOther+Rugs%3A%3AArea+Rugs%3A%3ACrates%2C+Buckets+%26+Bins%3A%3ALaundry+Organization%3A%3AOther+Storage+Containers%3A%3ABaskets">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Storage & Organization
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 ">Brands</h3>
            <ul>
              <li>
                <Link href="/shop?retailer=Wayfair">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Wayfair
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=West+Elm">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    West Elm
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=CB2">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    CB2
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=Pottery+Barn">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Pottery Barn
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href="${oldSpacejoyUrl}/shop?retailer=Target&discount=10%3A%3A100">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Target
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/shop?retailer=Crate+And+Barrel">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Crate & Barrel
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=Article">
                  <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Article
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="m-5">
            <Link href={`${oldSpacejoyUrl}/cookies`}>
              <a
                className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                target="_blank"
              >
                Cookie Statement
              </a>
            </Link>
          </div>
          <div className="m-5">
            <Link href="/terms">
              <a className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                Terms Of Service
              </a>
            </Link>
          </div>
          <div className="m-5">
            <Link href={`${oldSpacejoyUrl}/sitemap`}>
              <a
                className="text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                target="_blank"
              >
                Sitemap
              </a>
            </Link>
          </div>
        </div>
        <div className="py-4 text-center border-t border-gray-100">
          <p className="text-xs leading-7 text-gray-900">
            &copy; {currentYear} Neo Design Labs Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
