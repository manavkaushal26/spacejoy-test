import { company } from '@utils/config';
import Link from 'next/link';
import React from 'react';
import SocialLinks from './Footer/SocialLinks';
import Image from 'next/image';
import spacejoyPromiseData from '@utils/Mocks/spacejoyPromises';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="antialiased border-t border-gray-200">
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

      <div className="container mx-auto px-4">
        <div className="py-12 grid grid-cols-6 gap-2">
          <div className="col-span-2 xl:w-3/4">
            <h3 className="mb-2">About Us</h3>
            <p className="text-sm leading-relaxed text-gray-600">
            Spacejoy is a design-led e-commerce platform that enables a superior shopping experience by instantly visualizing your space with the products you want to buy. As a one-stop shop, Spacejoy allows you to discover unlimited options from your favorite home brands to furnish your space with ease. With professionally arranged furniture sets, users with all different styles and budgets can personalize their space with products they want to shop for.
            </p>
            <SocialLinks />
          </div>
          <div className="">
            <h3 className="px-1 mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link href="https://www.spacejoy.com/furniture-decor-shop">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Shop
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/room-select">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/online-interior-design">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Hire a Designer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/customer-stories">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Customer Stories
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/interior-designs">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Interior Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/purchase-gift-card">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Gift Cards
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/trending-items">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Deals Of The Day
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/style-quiz-intro">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Style Quiz
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/balance-check">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Check Card Balance
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="px-1 mb-2">Blog</h3>
            <ul>
              <li>
                <Link
                  href={{
                    pathname:
                      'https://www.spacejoy.com/interior-designs-blog/for-a-year-round-spring-feel-light-and-airy-furniture',
                  }}
                >
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Spring furniture ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/popular-living-room-colors',
                    query: { slug: 'for-a-year-round-spring-feel-light-and-airy-furniture' },
                  }}
                  // as="/interior-designs-blog/for-a-year-round-spring-feel-light-and-airy-furniture"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/popular-living-room-colors"
                  >
                    Best Living Room Colors
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/best-comfortable-sectionals-to-watch-tv',
                    query: { slug: '13-clever-and-stylish-storage-ideas-for-any-room-in-your-home' },
                  }}
                  as="/interior-designs-blog/13-clever-and-stylish-storage-ideas-for-any-room-in-your-home"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/best-comfortable-sectionals-to-watch-tv"
                  >
                    13 Best Sectional Sofas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname:
                      'https://www.spacejoy.com/interior-designs-blog/best-mid-century-modern-interior-design-style-furniture-to-buy',
                    query: { slug: 'gallery-wall-ideas-to-dress-up-your-walls' },
                  }}
                  as="/interior-designs-blog/gallery-wall-ideas-to-dress-up-your-walls"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/best-mid-century-modern-interior-design-style-furniture-to-buy"
                  >
                    Mid Century Modern Furniture
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/farmhouse-style-design-rules',
                    query: { slug: 'simple-diy-decor-ideas-to-ring-in-spring' },
                  }}
                  as="/interior-designs-blog/simple-diy-decor-ideas-to-ring-in-spring"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/farmhouse-style-design-rules"
                  >
                    Farmhouse Style Decor Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/small-living-room-insp-we-love',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/small-living-room-insp-we-love"
                  >
                    Small Living Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/how-to-decorate-your-living-room',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/how-to-decorate-your-living-room"
                  >
                    6 Steps To Decorate Living Room
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs-blog/minimalist-home-decor-style-guide',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs-blog/minimalist-home-decor-style-guide"
                  >
                    Minimalist Home Decor Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Support</h3>
            <ul>
              <li>
                <Link href="/help">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    FAQs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/refund-policy">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Refund Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="px-1 mb-2">Connect with us</h3>
            <ul>
              <li>
                <a
                  className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`tel:${company.phone.support}`}
                  target="_top"
                >
                  {company.phone.support}
                </a>
              </li>
              <li>
                <a
                  className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:${company.email.support}?Subject=Need%20Help`}
                  target="_top"
                >
                  {company.email.support}
                </a>
              </li>
              <li>
                <a
                  className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:hello@spacejoy.com`}
                  target="_top"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-12 grid grid-cols-6 gap-2">
          <div className="">
            <h3 className="mb-2 px-1">Furniture & Decor Sets</h3>
            <ul>
              <li>
                <Link href="https://test.spacejoy.com/design-sets/room/living-room-design-sets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Living Room Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/design-sets/room/bedroom-design-sets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Bedroom Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/design-sets/room/dining-room-design-sets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Dining Room Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/design-sets/room/home-office-design-sets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Home Office Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/design-sets/room/entryway-design-sets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Entryway Sets
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Design Styles</h3>
            <ul>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/modern-style-ideas',
                  }}
                >
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Modern Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/eclectic-room-designs',
                    query: { slug: 'for-a-year-round-spring-feel-light-and-airy-furniture' },
                  }}
                  // as="/interior-designs-blog/for-a-year-round-spring-feel-light-and-airy-furniture"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/eclectic-room-designs"
                  >
                    Eclectic Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/farmhouse-style-ideas',
                    query: { slug: '13-clever-and-stylish-storage-ideas-for-any-room-in-your-home' },
                  }}
                  as="/interior-designs-blog/13-clever-and-stylish-storage-ideas-for-any-room-in-your-home"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/farmhouse-style-ideas"
                  >
                    Modern Farmhouse Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/industrial-room-designs',
                    query: { slug: 'gallery-wall-ideas-to-dress-up-your-walls' },
                  }}
                  as="/interior-designs-blog/gallery-wall-ideas-to-dress-up-your-walls"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/industrial-room-designs"
                  >
                    Industrial Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/mid-century-modern-room-ideas',
                    query: { slug: 'simple-diy-decor-ideas-to-ring-in-spring' },
                  }}
                  as="/interior-designs-blog/simple-diy-decor-ideas-to-ring-in-spring"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/mid-century-modern-room-ideas"
                  >
                    Mid-Century Modern Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/transitional-style-ideas',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/transitional-style-ideas"
                  >
                    Transitional Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/classic-modern-design-ideas',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/classic-modern-design-ideas"
                  >
                    Contempory Modern Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: 'https://www.spacejoy.com/interior-designs/coastal-design-ideas',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="https://www.spacejoy.com/interior-designs/coastal-design-ideas"
                  >
                    Coastal Design Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Curated Collections</h3>
            <ul>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/spring-2020-look-book-living-room-designs-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Spring Look Book Living Room Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://test.spacejoy.com/room-select">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Spring Look Book Bedroom Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/spring-2020-look-book-entryway-designs-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Spring Look Book Entryway Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/bohemian-living-room-design-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Bohemian Living Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/open-living-and-dining-room-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Open Living-Dining Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/small-living-room-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Small Living Room Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/glam-design-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Glam Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs/minimalist-living-room-design-ideas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Minimalist Living Room Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Blog</h3>
            <ul>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/popular-living-room-colors">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Best Living Room Colors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/best-comfortable-sectionals-to-watch-tv">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    13 Best Sectional Sofas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/best-mid-century-modern-interior-design-style-furniture-to-buy">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Mid Century Modern Furniture
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/farmhouse-style-design-rules">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Farmhouse Style Decor Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/small-living-room-insp-we-love">
                  <a className=" text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Small Living Room Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/how-to-decorate-your-living-room">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    6 Steps To Decorate Living Room
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.spacejoy.com/interior-designs-blog/minimalist-home-decor-style-guide">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Minimalist Home Decor Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Products</h3>
            <ul>
              <li>
                <Link href="/shop?subcategory=Sofas">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Sofas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Tables&vertical=Coffee+Tables">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Coffee Tables
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Tables&vertical=End+%26+Side+Tables">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Side Tables
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Chairs&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Accent Chairs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Lights&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Lighting
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Mirrors&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Mirrors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Rugs&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting%3A%3ARunners%3A%3AOther+Rugs%3A%3AArea+Rugs">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Rugs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?subcategory=Storage+Containers&vertical=End+%26+Side+Tables%3A%3AAccent+Chairs%3A%3ACeiling+Lights%3A%3AFloor+Mirrors%3A%3AMakeup+And+Table+Mirrors%3A%3AWall-mounted+Mirrors%3A%3AWall+Lights%3A%3ALanterns%3A%3ADecorative+Lighting%3A%3ASeasonal+Lighting%3A%3ATrack+Lighting%3A%3ARunners%3A%3AOther+Rugs%3A%3AArea+Rugs%3A%3ACrates%2C+Buckets+%26+Bins%3A%3ALaundry+Organization%3A%3AOther+Storage+Containers%3A%3ABaskets">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Storage & Organization
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="mb-2 px-1">Brands</h3>
            <ul>
              <li>
                <Link href="/shop?retailer=Wayfair">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Wayfair
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=West+Elm">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    West Elm
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=CB2">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    CB2
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=Pottery+Barn">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Pottery
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href="https://www.spacejoy.com/shop?retailer=Target&discount=10%3A%3A100">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Target
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/shop?retailer=Crate+And+Barrel">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Crate & Barrel
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?retailer=Article">
                  <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Article
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className='m-5'>
            <Link href="https://www.spacejoy.com/cookies">
              <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                Cookie Statement
              </a>
            </Link>
          </div>
          <div className='m-5'>
            <Link href="https://www.spacejoy.com/terms">
              <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                Terms Of Service
              </a>
            </Link>
          </div>
          <div className='m-5'>
            <Link href="https://www.spacejoy.com/sitemap">
              <a className="px-1 text-sm text-gray-600 leading-7 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
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
