import SectionHeading from '@components/EcommercePage/SectionHeading';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { ArrowCircleRightIcon, ExternalLinkIcon, HeartIcon, HomeIcon } from '@heroicons/react/outline';
import { cloudinary, company } from '@utils/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import designTeamData from '../../mocks/DesignTeam';

const Designers = ({ designFeedData }): JSX.Element => {
  return (
    <>
      <Head>
        <title key="title">Meet the Designers | {company.product}</title>
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="container max-w-screen-xl px-4 mx-auto xl:p-0">
            <div></div>
            <SectionHeading
              preText={
                <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-orange-100 to-orange-300 w-fit">
                  <HomeIcon className="w-8 h-8 text-orange-500" />
                </div>
              }
              title="Meet our Design Team"
              subTitle="Passionate designers who believe every space has a story to tell"
              center
              noMargin
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-8">
              {designTeamData?.map((item) => {
                return (
                  <Link
                    href={`/designers/${item?.firstName.toLowerCase()}-${item?.lastName?.toLowerCase()}`}
                    key={item?.id}
                  >
                    <div
                      className="relative bg-neutral-500
                              bg-clip-padding
                              backdrop-filter
                              backdrop-blur-md
                              bg-opacity-10
                              backdrop-saturate-50
                              backdrop-contrast-125 bg-blend-overlay rounded-xl py-8
                              transition-transform hover:-translate-y-1 cursor-pointer  will-change-transform 
                              hover:shadow-lg 
                              "
                    >
                      <div key={item?.id} className="relative w-full aspect-[1/1] mx-auto w-1/2">
                        <Image
                          src={cloudinary.baseDeliveryURL + '/fl_lossy,q_auto,w_785/' + item?.icon}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full "
                          // height={300}
                          // width={300}
                          objectPosition={'40% 5%'}
                        />
                      </div>
                      <div className="px-4">
                        <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-600 text-center">
                          {item?.firstName + ' ' + item?.lastName}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <PreFooter />
          </div>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default React.memo(Designers);
