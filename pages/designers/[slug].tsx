import ShinyButton from '@components/Button/ShinyButton';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { LinkIcon } from '@heroicons/react/outline';
import { cloudinary, company } from '@utils/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import designTeamData from '../../mocks/DesignTeam';

const designerData = designTeamData?.reduce((accumulator, currentValue) => {
  const designerNameReadable = `${currentValue?.firstName.toLowerCase()}-${currentValue?.lastName.toLowerCase()}`;
  if (!accumulator[designerNameReadable]) {
    accumulator[designerNameReadable] = {
      ...currentValue,
    };
  }

  return accumulator;
}, {});

const ProfileSection = ({ data }): JSX.Element => {
  return (
    <div>
      <div className="mt-4">
        <h3 className="text-gray-700">About:</h3>
        <p className="text-gray-700">{data?.desc}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-700">Her Designs:</h3>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-0.5 gap-y-0.5 sm:grid-cols-3 sm:gap-x-1 lg:grid-cols-4 xl:gap-x-0.5 mt-2"
        >
          {(data?.designImages || []).map((item) => {
            return (
              <li key={item} className="relative">
                <div className="overflow-hidden bg-gray-100 cursor-pointer group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <img
                    alt=""
                    src={item}
                    className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75 cursor-pointer"
                  />
                </div>
              </li>
            );
          })}
          <li className="flex items-center justify-center">
            <Link href="/interior-designs">
              <p className="flex items-center space-x-1 underline cursor-pointer text-md text-spj-red">
                <span>See more designs</span> <LinkIcon className="w-4 h-4" />
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
const TeamSection = ({ data }): JSX.Element => {
  return (
    <div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-3">
          {designTeamData
            ?.filter((item) => item?.id !== data?.id)
            .map((person) => (
              <a
                key={person.id}
                href={`/designers/${person.firstName.toLowerCase()}-${person.lastName.toLowerCase()}`}
                target="_blank"
                rel="noreferrer noreferrer"
              >
                <div
                  key={person.id}
                  className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={cloudinary.baseDeliveryURL + '/fl_lossy,q_auto,w_785/' + person?.icon}
                      layout="fill"
                      objectFit="cover"
                      className="inline-block rounded-md"
                      alt="designert"
                      objectPosition={'40% 4%'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span aria-hidden="true" className="absolute inset-0" />
                    <p className="text-sm font-medium font-semibold tracking-tight text-gray-500 text-gray-900">
                      {person?.firstName + ' ' + person?.lastName}
                    </p>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
// const Reviews = ({ data }): JSX.Element => {
//   return <div className="mt-4">Reviews</div>;
// };
const tabList = [
  { name: 'Profile', href: '#', current: true, id: 0, content: ProfileSection },
  { name: 'Team', href: '#', current: false, content: TeamSection, id: 1 },
  // { name: 'Reviews', href: '#', current: false, content: Reviews, id: 2 },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Designers = (): JSX.Element => {
  const router = useRouter();
  const [data, setDesigner] = useState({
    coverImageUrl: '',
    icon: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (router.isReady) {
      setDesigner(designerData[router?.query?.slug as string]);
    }
  }, [router.isReady]);

  const [tabs, setTabs] = useState(tabList);
  const updateTab = (tabId) => {
    const updatedList = tabList?.map((item) => {
      if (item?.id === tabId) return { ...item, current: true };

      return { ...item, current: false };
    });
    setTabs(updatedList);
  };
  const currentTab = useMemo(() => {
    return tabs?.filter((item) => item?.current)[0]?.content({ data });
  }, [tabs, data]);

  return (
    <>
      <Head>
        <title key="title">Designer Profile | {company.product}</title>
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="container max-w-screen-xl px-4 mx-auto xl:p-0">
            <div>
              <div>
                {data?.coverImageUrl ? (
                  <img alt="" src={data?.coverImageUrl} className="object-cover w-full h-32 lg:h-48" />
                ) : null}
              </div>
              <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="relative w-40 h-40 rounded-md ring-4 ring-white">
                    {data?.icon ? (
                      <Image
                        src={cloudinary.baseDeliveryURL + '/fl_lossy,q_auto,w_785/' + data?.icon}
                        layout="fill"
                        objectFit="cover"
                        className="inline-block rounded-md"
                        alt="designert"
                        objectPosition={'50% 4%'}
                      />
                    ) : null}
                  </div>

                  <div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="items-center justify-between flex-1 block min-w-0 lg:flex">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {data?.firstName + ' ' + data?.lastName}{' '}
                      </h1>
                      <ShinyButton
                        href="https://designs.spacejoy.com/new-project"
                        target="_blank"
                        showRing={false}
                        className="w-full xl:w-fit"
                      >
                        <span className="text-sm">Hire Designer</span>
                      </ShinyButton>
                    </div>
                  </div>
                </div>
                <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{data?.firstName}</h1>
                </div>
              </div>
              <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div className="border-b border-gray-200">
                  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <nav aria-label="Tabs" className="flex -mb-px space-x-8">
                      {tabs.map((tab, index) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          aria-current={tab.current ? 'page' : undefined}
                          className={classNames(
                            tab.current
                              ? 'border-pink-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                          )}
                          onClick={() => updateTab(index)}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">{currentTab}</div>
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
