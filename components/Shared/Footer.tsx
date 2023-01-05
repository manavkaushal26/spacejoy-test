import { Tab } from '@headlessui/react';
import { company, oldSpacejoyUrl } from '@utils/config';
import { CommonSeoLinks } from '@utils/Mocks/CommonSeoLinks';
import spacejoyPromiseData from '@utils/Mocks/spacejoyPromises';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SocialLinks from './Footer/SocialLinks';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="antialiased border-t border-gray-200 footer">
      <div className="container px-4 mx-auto">
        {/* Mobile */}
        <div className="w-full mt-6 md:hidden">
          <Tab.Group>
            <Tab.List className={`grid grid-cols-3 border-b-2 w-fit mx-auto justify-center`}>
              {spacejoyPromiseData.map((promise) => (
                <Tab
                  key={promise.title}
                  className={({ selected }) => (selected ? 'border-b-2 border-b-black focus:outline-none' : '')}
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 aspect-1 md:ml-3 lg:mb-0 lg:ml-0">
                    <Image className="" src={promise.img} alt="" layout="fill" objectFit="contain" />
                  </div>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
              {spacejoyPromiseData.map((promise) => (
                <Tab.Panel key={promise.title}>
                  <h3 className="mt-2 mb-1">{promise.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{promise.description}</p>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Desktop -> min-width: 768px */}
        <div className="hidden gap-6 my-5 md:grid md:grid-cols-3">
          {spacejoyPromiseData.map((promise) => (
            <div key={promise.title} className="mt-2">
              <div className="relative flex flex-col py-2 bg-white rounded-lg sm:space-x-3 sm:py-5 justify-left lg:flex-row lg:items-start">
                <div className="relative">
                  <img className="w-16 h-16 mb-2 sm:ml-3 lg:mb-0 lg:ml-0" src={promise.img} alt={promise.title} />
                </div>
                <div className="flex-1 min-w-0 ml-0 lg:ml-2">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="mb-1 text-xs font-semibold text-gray-900">{promise.title}</p>
                  <p className="text-xs text-gray-500">{promise.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 py-6 md:py-12 sm:grid-cols-3 gap-x-2 gap-y-6 lg:grid-cols-6 lg:gap-2">
          <div className="mt-2 lg:col-span-2 xl:w-3/4">
            <h3 className="mb-2">About Spacejoy</h3>
            <p className="text-xs leading-relaxed text-gray-600">
              Spacejoy allows you to discover and furnish your space with furniture/decor sets crafted by designers. Try
              on different styles in any budget and personalize the sets by swapping it with your inspiration saved on
              Pinterest and shop directly from the platform.
            </p>
            <SocialLinks />
          </div>
          <div>
            <h3 className="mb-2">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-0">
              {/* <li>
                <Link href="${oldSpacejoyUrl}/furniture-decor-shop">
                  <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Shop
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/room-select">
                  <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Furniture & Decor Sets
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/quiz/start-quiz`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Hire a Designer
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/customer-stories`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Customer Stories
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/interior-designs`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Interior Design Ideas
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/purchase-gift-card`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Gift Cards
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href={`${oldSpacejoyUrl}/trending-items`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Deals Of The Day
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href={`${oldSpacejoyUrl}/style-quiz-intro`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Style Quiz
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${oldSpacejoyUrl}/balance-check`}>
                  <a
                    className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    target="_blank"
                  >
                    Check Card Balance
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 ">Support</h3>
            <ul className="flex flex-wrap items-center sm:block sm:space-x-0">
              <li className="footer-item">
                <Link href="/help">
                  <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    FAQs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                    Refund Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 ">Connect with us</h3>
            <ul className="space-y-1 sm:space-y-0">
              {/* <li>
                <a
                  className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`tel:${company.phone.support}`}
                  target="_top"
                >
                  {company.phone.support}
                </a>
              </li> */}
              <li>
                <a
                  className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:${company.email.support}?Subject=Need%20Help`}
                  target="_top"
                >
                  {company.email.support}
                </a>
              </li>
              <li>
                <a
                  className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  href={`mailto:hello@spacejoy.com`}
                  target="_top"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 py-6 md:py-12 sm:grid-cols-3 gap-x-2 gap-y-6 lg:grid-cols-6 lg:gap-2">
          {CommonSeoLinks.map((commonLink) => (
            <div key={commonLink.title}>
              <h3 className="mb-2">{commonLink.title}</h3>
              <ul
                className={
                  commonLink.dots === true
                    ? 'flex items-center flex-wrap sm:block sm:space-x-0'
                    : 'space-y-1 sm:space-y-0'
                }
              >
                {commonLink.list.map((link) => (
                  <li key={link.title} className={commonLink.dots ? 'footer-item' : null}>
                    <Link href={link.link}>
                      <a
                        className="text-xs leading-relaxed text-gray-600 break-words rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                        target={link.link.startsWith('https://designs.spacejoy.com') ? '_blank' : ''}
                      >
                        {link.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap items-start justify-center pt-4 mb-3 text-center border-t border-gray-100 sm:flex-row sm:items-center sm:border-none sm:pt-0">
          <div className="my-2 sm:m-5">
            <Link href={`${oldSpacejoyUrl}/cookies`}>
              <a
                className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                target="_blank"
              >
                Cookie Statement
              </a>
            </Link>
          </div>
          <div className="my-2 sm:m-5">
            <Link href={`/privacy-policy`}>
              <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                Privacy Policy
              </a>
            </Link>
          </div>
          <div className="my-2 sm:m-5">
            <Link href="/terms">
              <a className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none">
                Terms Of Service
              </a>
            </Link>
          </div>
          <div className="my-2 sm:m-5">
            <Link href={`${oldSpacejoyUrl}/sitemap`}>
              <a
                className="text-xs leading-relaxed text-gray-600 rounded-md hover:text-red-500 focus:text-red-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                target="_blank"
              >
                Sitemap
              </a>
            </Link>
          </div>
        </div>

        <div className="py-4 text-center border-t border-gray-100">
          <p className="text-xs leading-relaxed text-gray-900">
            &copy; {currentYear} Neo Design Labs Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
