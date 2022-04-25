import ImageGallaryGrid from '@components/CustomerStories/ImageGallaryGrid';
import { AssetList, StoryViewResponse } from '@components/CustomerStories/StoryViewInterface';
import Layout from '@components/Shared/Layout';
import { cloudinary, company } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import SVGIcon from '@components/SVGIcon';
import UserCard from '@components/Cards/UserCard';
import { priceToLocaleString } from '@utils/helpers';
import Link from 'next/link';
import { blurredProduct } from '@public/images/bg-base-64';
import CustomerCard from '@components/CustomerStories/CustomerCard';
import { lightBoxOptions } from '@components/Carousel';
import { SRLWrapper } from 'simple-react-lightbox';
import SimpleReactLightbox from 'simple-react-lightbox';

const StoryBodyStyled = styled.div`
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    margin: 8px 0px;
  }
  p span {
    font-size: 14px !important ;
  }
  p {
    margin: 8px 0px;
  }
  p span a {
    color: #f5296e;
  }
`;

// const StepBounce = ({bg = theme.colors.black2, children}) =>{

//   return (
//     <div className={`bg-[${theme.colors[bg]}] text-center text-white py-1 px-1 sm:px-3 mt-20 min-w-[30px] before:content-none before:absolute before:top-0 before:h-full before:w-[1px] before:left-1/2 before:z-[1] after:content-none after:absolute after:top-20 after:w-4 after:h-4 after:bg-white after:rotate-45`}>{children}</div>
//   )
// }

const StepBounce = styled.div`
  border-radius: 2px 0 0 2px;
  background-color: #060606;
  text-align: center;
  color: white;
  padding: 0.25rem 0.75rem;
  margin-top: 5rem;
  min-width: 30px;
  &:before {
    content: '';
    border-left: 1px dashed #33D4245;
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    left: 50%;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    top: 5.5rem;
    width: 15px;
    height: 15px;
    right: -10px;
    background: white;
    transform: rotate(45deg);
  }
  @media (max-width: 768px) {
    padding: 0.25rem;
    span {
      display: none;
    }
  }
`;

const TimeLineItem = styled.div`
  position: relative;
  h2 {
    margin: 0rem;
    & + {
      p {
        margin-top: 0.25rem;
      }
    }
  }
  .avatar {
    max-width: 100%;
    @media (max-width: 992px) {
      max-width: 50px;
    }
  }
  .image-gallery {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2rem;
    @media (max-width: 576px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }
`;

const TimeLineCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 10fr;
  grid-row-gap: 1rem;
  overflow: hidden;
  &:first-child {
    ${StepBounce} {
      &:before {
        top: 5rem;
      }
    }
  }
  &:last-child {
    ${StepBounce} {
      &:before {
        top: auto;
        bottom: calc(100% - 90px);
      }
    }
  }
  ${TimeLineItem}:nth-child(2) {
    margin-top: 2rem;
  }
`;

const renderStep = (section) => {
  switch (section) {
    case 'requirement':
      return (
        <StepBounce>
          <span>#</span>1
        </StepBounce>
      );
    case 'designProcess':
      return (
        <StepBounce>
          <span>#</span>2
        </StepBounce>
      );
    case 'designInApp':
      return (
        <StepBounce>
          <span>#</span>3
        </StepBounce>
      );
    case 'revision':
      return (
        <StepBounce>
          <SVGIcon name="heart" width={16} height={16} fill="white" />
          {/* <span className="icon-message-square" /> */}
        </StepBounce>
      );
    case 'render':
      return (
        <StepBounce>
          <SVGIcon name="tick" width={16} height={16} fill="white" />
          {/* <span className="icon-check" /> */}
        </StepBounce>
      );
    default:
      return (
        <StepBounce>
          <span>Step </span>
        </StepBounce>
      );
  }
};

const Product = ({ asset }) => {
  return (
    <div>
      <Link href={`/product-view/${asset?._id}`} passHref>
        <a>
          <div className="flex flex-col bg-white justify-between rounded-lg h-full hover:z-30 hover:scale-[1.02] relative transition hover:shadow-xl">
            <div className="p-4">
              <div className="relative w-full mb-2 aspect-w-1 aspect-h-1">
                <Image
                  src={asset?.cdn ? `${cloudinary.baseDeliveryURL}/c_scale,w_400/${asset?.cdn}` : asset?.imageUrl}
                  alt={asset?.name}
                  blurDataURL={blurredProduct}
                  className="object-contain object-center w-full h-full"
                  layout="fill"
                  placeholder="blur"
                />
              </div>
              <small className="mt-4 text-xs text-gray-500">{asset?.retailer}</small>

              <h3 className="text-gray-700 text-base sm:min-h-[40px] min-h-[20px] overflow-ellipsis line-clamp-1 sm:line-clamp-2">
                {asset?.name}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                <span>{priceToLocaleString(asset?.price)}</span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

const storyView: React.FC<StoryViewResponse> = ({ data: { about, timeline, summary, createdAt, slug } }) => {
  const roomType = timeline.length > 0 && timeline[0].meta && timeline[0].meta.roomType;
  const creationDate = new Date(createdAt).toDateString();

  return (
    <Layout>
      <Head>
        {IndexPageMeta}
        <title key="title">
          Check {roomType} design review created for {about && about.customerName} by {company.product}
        </title>
        {about?.title && about && (
          <meta
            key="description"
            name="description"
            content={`Take a look at the ${about?.title} designed for ${
              about && about.customerName
            }. Find step by step process details, before & after 3D images, review and handpicked decor products used in the design`}
          />
        )}
        <meta name="publish-date" content={creationDate} />
        <meta name="created-date" content={creationDate} />
        <meta name="modified-date" content={creationDate} />
        {slug && <link key="canonical" rel="canonical" href={`https://www.spacejoy.com/customer-stories/${slug}`} />}
        <meta
          key="og-title"
          property="og:title"
          content={`Check ${roomType} design review created for ${about && about?.customerName} by ${company.product}`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`Take a look at the ${about?.title} designed for ${
            about && about?.customerName
          }. Find step by step process details, before & after 3D images, review and handpicked decor products used in the design`}
        />
        <meta key="og-url" property="og:url" content={`https://www.spacejoy.com/customer-stories/${slug}`} />
        <meta
          key="og-image"
          property="og:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_700/${about?.afterImages[1].cdn}`}
        />
        <meta key="og-image-width" property="og:image:width" content="700" />
        <meta key="og-image-height" property="og:image:height" content="394" />
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Check ${roomType} design review created for ${about && about?.customerName} by ${company.product}`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`Take a look at the ${about?.title} designed for ${
            about && about?.customerName
          }. Find step by step process details, before & after 3D images, review and handpicked decor products used in the design`}
        />
        <meta
          key="twitter-image"
          name="twitter:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_700/${about?.afterImages[1].cdn}`}
        />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div>
          <SimpleReactLightbox>
            <SRLWrapper>
              <ImageGallaryGrid data={about?.afterImages} />
            </SRLWrapper>
          </SimpleReactLightbox>

          <div className=" px-5">
            <div className="mt-12 mb-8">
              {roomType && <p className=" text-xs sm:text-sm font-semibold text-gray-500">{roomType}</p>}
              <h3 className=" text-2xl sm:text-4xl capitalize mb-1 sm:mb-2">{about?.title}</h3>
              <p className="text-base text-gray-700 mt-8">
                Read {about?.customerName}&apos;s online interior design experience with Spacejoy
              </p>
            </div>

            <div className="flex flex-col sm:space-x-8 space-y-8 md:space-y-0 sm:flex-row lg:mx-48">
              <CustomerCard
                name={about?.customerName}
                description={about?.projectDescription}
                subText="Designed For"
                avatar={about?.customerAvatar}
              />
              <CustomerCard
                name={about?.designerName}
                description={about?.designerAbout}
                subText="Designed By"
                avatar={about?.designerAvatar}
              />
            </div>
          </div>

          <div className="mt-6 mx-5 sm:mt-12 bg-[#e9ecee]">
            <div className="my-2 sm:mx-52 pb-2">
              <div className="container">
                <div className="grid text-center">
                  <div className="lg:col-span-10 pr-5">
                    {timeline.map((item, index) => (
                      <TimeLineCardWrapper key={item._id}>
                        <TimeLineItem>{renderStep(item.section)}</TimeLineItem>
                        <TimeLineItem>
                          <div className="bg-white p-4 rounded-md">
                            <div className="grid text-left">
                              <div className="grid-cols-12">
                                <div className="flex space-x-5 content-center mb-8">
                                  <div className="relative rounded-full ring-2 ring-white bg-[#F39C12] h-16 w-16 -mb-1 border-1 border-white overflow-hidden">
                                    <Image
                                      src={`${cloudinary.baseDeliveryURL}/c_fill,g_faces,h_100,w_100/${about?.customerAvatar}`}
                                      alt=""
                                      layout="fill"
                                    />
                                  </div>
                                  <div>
                                    <h2 className="text-xl sm:text-3xl">{item.title}</h2>
                                  </div>
                                </div>
                                <p className="text-sm mb-5">{item.description}</p>
                                {item.section !== 'render' && item.images.length > 0 && (
                                  <SimpleReactLightbox>
                                    <SRLWrapper {...lightBoxOptions}>
                                      <ImageGallaryGrid data={item.images} />
                                    </SRLWrapper>
                                  </SimpleReactLightbox>
                                )}
                                {item.section === 'designProcess' && item.meta && (
                                  <>
                                    <br />
                                    <div className=" bg-blue-50 m-0 shadow-none p-4 rounded-md">
                                      <h3 className=" text-xl sm:text-2xl capitalize mb-1 sm:mb-2">Designer Notes</h3>
                                      <p className="text-sm text-gray-700 mt-8">{item.meta.designerNote}</p>
                                    </div>
                                  </>
                                )}
                                {item.section === 'revision' && item.meta && (
                                  <p className="text-light2">{item.meta?.feedback}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </TimeLineItem>
                      </TimeLineCardWrapper>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="grid text-center">
              <div className="mt-12 mb-8">
                <h3 className=" text-2xl sm:text-4xl capitalize mb-1 sm:mb-2">Final Design Renders</h3>
                <p className=" text-xs sm:text-sm text-gray-500">100% Happiness Delivered</p>
              </div>
              <div className="mb-8">
                <SimpleReactLightbox>
                  <SRLWrapper {...lightBoxOptions}>
                    <ImageGallaryGrid data={about.afterImages} />
                  </SRLWrapper>
                </SimpleReactLightbox>
              </div>

              {summary && summary?.testimonial && (
                <div className=" bg-yellow-50 m-0 shadow-none sm:mx-48 rounded-md p-5">
                  <div className="grid text-left">
                    <div className="">
                      <div className="mb-8">
                        <h3 className=" text-xl sm:text-2xl capitalize mb-1 sm:mb-2">{`This is what ${about.customerName} had to say on the final design`}</h3>
                        <p className=" text-sm  text-gray-500">Joyous Homes, Happy Customer</p>
                      </div>
                      <p>{summary?.testimonial}</p>
                      <UserCard
                        dp={about.customerAvatar}
                        name={about.customerName}
                        ratings={summary?.rating}
                        address={about.customerAddress.state}
                        align="left"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="">
                {summary && summary?.assetList && summary?.assetList.length > 0 && (
                  <div className="m-5 mt-16 sm:mt-24 flex flex-col bg-gray-100 py-5 sm:p-5">
                    <h3 className="text-center text-2xl sm:text-4xl capitalize mb-8 sm:mb-8">Shopping List</h3>
                    <div className="text-left grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
                      {summary?.assetList &&
                        summary?.assetList.map((item) => {
                          return <Product asset={item?.asset} key={item._id} />;
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const blogRes = await fetcher({
      endPoint: `${publicRoutes.customerStoryView}/${params?.slug}`,
      method: 'GET',
    });
    const { data, statusCode } = blogRes;
    if (statusCode <= 301) {
      return {
        props: {
          data,
        },
      };
    } else {
      throw new Error(statusCode);
    }
  } catch (e) {
    return {
      props: {
        error: e.message || 'Something went wrong',
      },
    };
  }
};

export default React.memo(storyView);
