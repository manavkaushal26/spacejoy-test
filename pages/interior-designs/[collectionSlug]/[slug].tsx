import CustomerStories from '@components/EngagementBlocks/CustomerStories';
import CustomerStoriesCarousel from '@components/EngagementBlocks/CustomerStoriesCarousel';
import EditorPick from '@components/EngagementBlocks/EditorPick';
import { EngagementBlockInterface } from '@components/EngagementBlocks/EngagementBlockInterface';
import SimilarPicks from '@components/EngagementBlocks/SimilarPicks';
import { getEngagementsBlocks } from '@components/EngagementBlocks/Utils';
import Breadcrumb from '@components/InteriorDesigns/Breadcrumb';
import ImageGrid from '@components/InteriorDesigns/ImageGrid';
import TestimonialsMini from '@components/InteriorDesigns/TestimonialsMini';
import { AssetInterface, DesignViewInterface } from '@components/InteriorDesigns/types';
import DesignerCard from '@components/Shared/DesignerCard';
import SocialLinks from '@components/Shared/Footer/SocialLinks';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { oldSpacejoyUrl } from '@utils/config';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

interface Props {
  design: DesignData;
  engagementBlockData: EngagementBlockInterface;
}

interface DesignData {
  _id: string;
  name: string;
  longDescription: string;
  metaDescription: string;
  description: string;
  metaTitle: string;
  altTag: string;
  slug: string;
  designCostEstimate: number;
  cdnRender: Array<string>;
  assets: Array<AssetInterface>;
  tags: Array<string>;
  room: {
    roomType: string;
    slug: string;
    _id: string;
  };
  publishedDate: string;
}

const DesignView: React.FC<Props> = ({ design, engagementBlockData }) => {
  const { customerData, editorPickData, similarPicksData, categoryData } = engagementBlockData;

  return (
    <Layout>
      <Head>
        <title>{design?.name} | Spacejoy</title>
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="bg-gray-100">
          <div className="container mx-auto px-4">
            <Breadcrumb design={design} />
            <h2 className="my-8 text-3xl tracking-wide">{design?.name}</h2>
            <ImageGrid images={design?.cdnRender} />
            <p className=" text-sm my-8">{design?.description}</p>
            <div className="flex justify-center space-x-5 sm:space-x-10 content-center">
              <SocialLinks />
              <div className="rounded-md shadow">
                <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
                  <a className="w-full flex items-center justify-center px-4 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900  md:py-4 md:text-lg md:px-10 text-center">
                    Start Your Project
                  </a>
                </Link>
              </div>
            </div>
            <h3 className="text-2xl tracking-wide text-gray-700 mt-20 mb-8">Shop the products featured in this room</h3>
            <div className="flex md:flex-row flex-col md:space-x-10 space-y-5 sm:space-y-0">
              <div className="sm:w-3/5 xl:w-3/4">
                <div className="sticky top-24 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-1 sm:gap-3">
                  {design?.assets?.length === 0 ? (
                    <>
                      {[...Array(28)].map((_d, _i) => {
                        return <ProductCardDimmer key={_i} />;
                      })}
                    </>
                  ) : (
                    <>
                      {design?.assets?.map((asset, index) => {
                        return (
                          <ProductCard
                            key={`${asset.asset._id}-${index}`}
                            product={{
                              ...asset?.asset,
                              msrp: asset?.asset?.price,
                              imageUrl: `https://res.cloudinary.com/spacejoy/image/upload/${asset?.asset?.cdn}`,
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="sm:w-2/5 xl:w-1/4">
                <div className="flex flex-col space-y-5">
                  <TestimonialsMini />
                  <div className="bg-white rounded-lg p-4 2xl:p-8 ">
                    <h3 className="text-lg mb-4">About the Design</h3>
                    <p className="text-sm text-gray-500 mb-6">{design?.description}</p>
                  </div>
                  <div className="flex flex-col space-y-5 md:basis-1/3 h-fit">
                    <div className=" bg-white flex flex-col p-5 space-y-5 rounded-lg shadow-md">
                      <h3 className=" text-xl">Unlock The Best Version Of Your Living Room</h3>
                      <div className="rounded-md shadow">
                        <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
                          <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900  md:py-4 md:text-lg md:px-10">
                            Start Your Project
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div>
                      {editorPickData.length && (
                        <div className="p-5 shadow-none bg-white md:mr-5 rounded-lg">
                          <h2 className=" text-xl font-bold">Editors Pick</h2>
                          <p className=" text-sm">Explore editors design</p>
                          <EditorPick data={editorPickData} />
                        </div>
                      )}
                    </div>
                    {/* <div className=" bg-white md:mr-5 rounded-lg">
                      {customerData.length && (
                        <div className="p-5 shadow-none">
                          <h2 className=" text-xl font-bold">Customers Stories</h2>
                          <p className=" text-sm">Explore customer designs</p>
                          <CustomerStories data={customerData} />
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white mt-8 rounded-lg">
              {similarPicksData.length && (
                <div className="mt-3 p-5 shadow-none">
                  <h2 className=" text-xl font-bold">Similar Picks</h2>
                  <p className=" text-sm">Related designs for you</p>
                  <SimilarPicks data={similarPicksData} />
                </div>
              )}
            </div>
            <div className=" bg-white mt-8 rounded-lg">
              {customerData.length && (
                <div className="mt-3 p-5 shadow-none">
                  <h2 className=" text-xl font-bold">Customer Stories</h2>
                  <p className=" text-sm">Explore editors design</p>
                  <CustomerStoriesCarousel data={customerData} />
                </div>
              )}
            </div>
            <div className=" bg-white mt-8 rounded-lg">
              {categoryData.length && (
                <div className="mt-3 p-5 shadow-none">
                  <h2 className=" text-xl font-bold">Categories</h2>
                  <p className=" text-sm">Explore other categories</p>
                  <SimilarPicks data={categoryData} />
                </div>
              )}
            </div>
            <PreFooter />
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

const getFirstSet = async () => {
  return {
    products: [
      { slug: 'best-selling-home-decor-and-furniture-pieces-of-2021', collectionSlug: 'living-room-ideas' },
      { slug: 'make-your-entryway-more-welcoming-this-christmas', collectionSlug: 'entryway-ideas' },
      { slug: 'beautiful-and-bright-a-modern-rustic-dining-room', collectionSlug: 'dining-room-ideas' },
      { slug: 'colorful-mid-century-modern-living-room-with-rattan-furniture', collectionSlug: 'living-room-ideas' },
      {
        slug: 'a-transitional-living-dining-room-with-rustic-accents',
        collectionSlug: 'open-living-and-dining-room-ideas',
      },
      { slug: 'mid-century-modern-balcony-design-with-a-green-ceiling', collectionSlug: 'entryway-ideas' },
      { slug: 'mid-century-modern-coastal-living-room', collectionSlug: 'living-room-ideas' },
      { slug: 'pine-green-rustic-farmhouse-dining-room', collectionSlug: 'dining-room-ideas' },
      { slug: 'modern-and-trendy-boho-living-room-with-japandi-decor', collectionSlug: 'living-room-ideas' },
      { slug: 'industrial-glam-living-room-with-mustard-accents', collectionSlug: 'living-room-ideas' },
      { slug: 'transitional-home-office-with-a-sleeper-sofa', collectionSlug: 'home-office-ideas' },
      { slug: 'an-art-deco-glam-bedroom-with-bold-walls-and-metallic-accents', collectionSlug: 'bedroom-ideas' },
      { slug: 'urban-rustic-kids-bedroom-with-twin-beds', collectionSlug: 'kids-room-ideas' },
      {
        slug: 'contemporary-transitional-open-concept-living-dining-room',
        collectionSlug: 'open-living-and-dining-room-ideas',
      },
      { slug: 'white-and-beach-themed-modern-bedroom-decor', collectionSlug: 'bedroom-ideas' },
      { slug: 'galaxy-themed-blue-childrens-room-with-star-bedding', collectionSlug: 'kids-room-ideas' },
      {
        slug: 'mid-century-glam-living-dining-room-with-mettalic-accents',
        collectionSlug: 'open-living-and-dining-room-ideas',
      },
    ],
  };
};

export async function getStaticPaths({}) {
  // get all product paths
  const { products } = await getFirstSet();
  const paths = products.map((product) => ({
    params: { slug: product?.slug, collectionSlug: product?.collectionSlug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const response = await fetcher({ endPoint: `/web/designs/public/slug/${params?.slug}`, method: 'GET' });
  const { data, statusCode } = response;
  const queryParams = '?&limit=5';
  const engagementBlockData = await getEngagementsBlocks(queryParams);
  if (statusCode < 300) {
    return {
      props: {
        design: data,
        engagementBlockData,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default DesignView;
