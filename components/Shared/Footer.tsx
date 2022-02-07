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

        <div className="grid grid-cols-6 gap-4 py-12">
          <div className="col-span-2 xl:w-3/4">
            <h3 className="mb-2">About Us</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Spacejoy is an online interior design studio. See your room designed in 3D curated with handpicked
              products that you shop right away from our platform.
            </p>
            <SocialLinks />
          </div>
          <div className="">
            <h3 className="px-1 mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link href="/pricing">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/customer-stories">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Customer Stories
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/interior-designs">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Interior Designs Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/purchase-gift-card">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Gift Cards
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/online-room-design">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Design Process
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/online-interior-designers">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Meet The Team
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
                    pathname: '/interior-designs-blog',
                  }}
                >
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Online Interior Design Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/interior-designs-blog',
                    query: { slug: 'for-a-year-round-spring-feel-light-and-airy-furniture' },
                  }}
                  as="/interior-designs-blog/for-a-year-round-spring-feel-light-and-airy-furniture"
                >
                  <a
                    className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="/interior-designs-blog/for-a-year-round-spring-feel-light-and-airy-furniture"
                  >
                    Spring Furniture Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/interior-designs-blog',
                    query: { slug: '13-clever-and-stylish-storage-ideas-for-any-room-in-your-home' },
                  }}
                  as="/interior-designs-blog/13-clever-and-stylish-storage-ideas-for-any-room-in-your-home"
                >
                  <a
                    className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="/interior-designs-blog/13-clever-and-stylish-storage-ideas-for-any-room-in-your-home"
                  >
                    13 Clever Storage Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/interior-designs-blog',
                    query: { slug: 'gallery-wall-ideas-to-dress-up-your-walls' },
                  }}
                  as="/interior-designs-blog/gallery-wall-ideas-to-dress-up-your-walls"
                >
                  <a
                    className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="/interior-designs-blog/gallery-wall-ideas-to-dress-up-your-walls"
                  >
                    Gallery Wall Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/interior-designs-blog',
                    query: { slug: 'simple-diy-decor-ideas-to-ring-in-spring' },
                  }}
                  as="/interior-designs-blog/simple-diy-decor-ideas-to-ring-in-spring"
                >
                  <a
                    className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="/interior-designs-blog/simple-diy-decor-ideas-to-ring-in-spring"
                  >
                    DIY Spring Decor Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/interior-designs-blog',
                    query: { slug: 'colorful-wreath-ideas-that-go-beyond-the-front-door' },
                  }}
                  as="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                >
                  <a
                    className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    href="/interior-designs-blog/colorful-wreath-ideas-that-go-beyond-the-front-door"
                  >
                    Spring Wreath Ideas
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="px-1 mb-2">Support</h3>
            <ul>
              <li>
                <Link href="/help">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Help
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Terms of Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Cookie Statement
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" as="/refund-policy">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Refund Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sitemap" as="/sitemap">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Sitemap
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
                  className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:${company.email.support}?Subject=Partner%20With%20Spacejoy`}
                  target="_top"
                >
                  Partner With Us
                </a>
              </li>
              <li>
                <Link href="/career" as="/career">
                  <a className="px-1 text-sm leading-7 text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Careers
                  </a>
                </Link>
              </li>
            </ul>
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
