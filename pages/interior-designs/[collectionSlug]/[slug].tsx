import CustomerStoriesCarousel from '@components/EngagementBlocks/CustomerStoriesCarousel';
import EditorPicksCarousel from '@components/EngagementBlocks/EditorPicksCarousel';
import { EngagementBlockInterface } from '@components/EngagementBlocks/EngagementBlockInterface';
import SimilarPicksCarousel from '@components/EngagementBlocks/SimilarPicksCarousel';
import { getEngagementsBlocks } from '@components/EngagementBlocks/Utils';
import Breadcrumb from '@components/InteriorDesigns/Breadcrumb';
import ImageGrid from '@components/InteriorDesigns/ImageGrid';
import TestimonialsMini from '@components/InteriorDesigns/TestimonialsMini';
import { AssetInterface } from '@components/InteriorDesigns/types';
import SocialLinks from '@components/Shared/Footer/SocialLinks';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import useBoolean from '@hooks/useBoolean';
import { imageKit } from '@utils/config';
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
  urlRender: Array<string>;
  publishedDate: string;
}

const DesignView: React.FC<Props> = ({ design, engagementBlockData }) => {
  const { value, toggle } = useBoolean(false);
  const { customerData, editorPickData, similarPicksData, categoryData } = engagementBlockData;
  console.log({ design });

  return (
    <Layout>
      <Head>
        <title>{design?.name} | Spacejoy</title>
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container max-w-screen-xl px-4 mx-auto xl:p-0">
          <div className="container px-4 mx-auto">
            <Breadcrumb design={design} />
            <h2 className="my-8 text-3xl tracking-wide">{design?.name}</h2>
            <ImageGrid images={design?.cdnRender} />
            <div className="my-8 text-sm ">
              <p className={`${!value && 'line-clamp-3'} leading-normal whitespace-pre-line`}>{design?.description}</p>
              <button className="my-1 text-[#F5296E] text-sm" onClick={toggle}>
                {!value ? '... read more' : 'hide'}
              </button>
            </div>
            <div className="flex content-center justify-center space-x-5 sm:space-x-10">
              <SocialLinks />
              <div className="rounded-md shadow">
                <Link href={`/quiz/start-quiz`} passHref>
                  <a className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-md sm:px-8 md:py-4 md:text-lg md:px-10">
                    Start Your Project
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-10 sm:mt-20">
              <div className="sm:w-2/3">
                <h3 className="mb-8 text-2xl tracking-wide text-gray-700">Shop the products featured in this room</h3>
                <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 sm:gap-3">
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
                              imageUrl: `${imageKit.baseDeliveryUrl}/${asset?.asset?.cdn}`,
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="sm:w-1/3">
                <div className="sticky flex flex-col space-y-5 rounded-lg top-28 sm:shadow-2xl">
                  <TestimonialsMini />
                  <div className="flex flex-col space-y-5 md:basis-1/3 h-fit">
                    <div className="flex flex-col p-5 space-y-5 bg-white rounded-lg ">
                      <h3 className="text-xl capitalize ">Unlock The Best Version Of Your {design.room.roomType}</h3>
                      <div className="rounded-md shadow">
                        <Link href={`/quiz/start-quiz`} passHref>
                          <a className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md md:py-4 md:text-lg md:px-10">
                            Start Your Project
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-gray-100 rounded-lg">
              {similarPicksData.length && (
                <div className="p-5 mt-3 shadow-none">
                  <h2 className="text-xl font-bold ">Similar Picks</h2>
                  <p className="text-sm ">Related designs for you</p>
                  <SimilarPicksCarousel data={similarPicksData} />
                </div>
              )}
            </div>
            <div className="mt-8 bg-gray-100 rounded-lg ">
              {editorPickData.length && (
                <div className="p-5 mt-3 shadow-none">
                  <h2 className="text-xl font-bold ">Editors Pick</h2>
                  <p className="text-sm ">Explore editors design</p>
                  <EditorPicksCarousel data={editorPickData} />
                </div>
              )}
            </div>
            <div className="mt-8 bg-gray-100 rounded-lg ">
              {customerData.length && (
                <div className="p-5 mt-3 shadow-none">
                  <h2 className="text-xl font-bold ">Customer Stories</h2>
                  <p className="mb-5 text-sm ">Explore customer designs</p>
                  <CustomerStoriesCarousel data={customerData} />
                </div>
              )}
            </div>
            <div className="mt-8 bg-gray-100 rounded-lg ">
              {categoryData.length && (
                <div className="p-5 mt-3 shadow-none">
                  <h2 className="text-xl font-bold ">Categories</h2>
                  <p className="text-sm ">Explore other categories</p>
                  <SimilarPicksCarousel data={categoryData} />
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
