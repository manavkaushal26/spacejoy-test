import Breadcrumb from '@components/InteriorDesigns/Breadcrumb';
import ImageGrid from '@components/InteriorDesigns/ImageGrid';
import { DesignViewInterface } from '@components/InteriorDesigns/types';
import DesignerCard from '@components/Shared/DesignerCard';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import React from 'react';

const DesignView: React.FC<DesignViewInterface> = ({ design }) => {
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
            <h3 className="text-2xl tracking-wide text-gray-700 mt-20 mb-8">Shop the products featured in this room</h3>
            <div className="my-8 flex flex-col sm:flex-row space-y-4 sm:space-x-4 2xl:space-x-8">
              <div className="sm:w-3/5 xl:w-3/4">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-1 h-full">
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
                <div className="sticky top-24 2xl:top-28">
                  {/* <DesignerCard /> */}
                  <div className="bg-white rounded-lg p-4 2xl:p-8 mt-4 2xl:mt-8">
                    <h3 className="text-lg mb-4">About the Design</h3>
                    <p className="text-sm text-gray-500 mb-6">{design?.description}</p>
                  </div>
                </div>
              </div>
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
      { slug: 'make-your-entryway-more-welcoming-this-christmas', collectionSlug: 'entryway-ideas'  },
      { slug: 'beautiful-and-bright-a-modern-rustic-dining-room', collectionSlug: 'dining-room-ideas'  },
      { slug: 'colorful-mid-century-modern-living-room-with-rattan-furniture', collectionSlug: 'living-room-ideas'  },
      { slug: 'a-transitional-living-dining-room-with-rustic-accents', collectionSlug: 'open-living-and-dining-room-ideas'  },
      { slug: 'mid-century-modern-balcony-design-with-a-green-ceiling', collectionSlug: 'entryway-ideas'  },
      { slug: 'mid-century-modern-coastal-living-room', collectionSlug: 'living-room-ideas'  },
      { slug: 'pine-green-rustic-farmhouse-dining-room', collectionSlug: 'dining-room-ideas'  },
      { slug: 'modern-and-trendy-boho-living-room-with-japandi-decor', collectionSlug: 'living-room-ideas'  },
      { slug: 'industrial-glam-living-room-with-mustard-accents', collectionSlug: 'living-room-ideas'  },
      { slug: 'transitional-home-office-with-a-sleeper-sofa', collectionSlug: 'home-office-ideas'  },
      { slug: 'an-art-deco-glam-bedroom-with-bold-walls-and-metallic-accents', collectionSlug: 'bedroom-ideas'  },
      { slug: 'urban-rustic-kids-bedroom-with-twin-beds', collectionSlug: 'kids-room-ideas'  },
      { slug: 'contemporary-transitional-open-concept-living-dining-room', collectionSlug: 'open-living-and-dining-room-ideas'  },
      { slug: 'white-and-beach-themed-modern-bedroom-decor', collectionSlug: 'bedroom-ideas'  },
      { slug: 'galaxy-themed-blue-childrens-room-with-star-bedding', collectionSlug: 'kids-room-ideas'  },
      { slug: 'mid-century-glam-living-dining-room-with-mettalic-accents', collectionSlug: 'open-living-and-dining-room-ideas'  },
    ],
  };
};

export async function getStaticPaths({}) {
  // get all product paths
  const { products } = await getFirstSet();
  const paths = products.map((product) => ({
    params: { slug: product?.slug,
    collectionSlug: product?.collectionSlug },
  }));


  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const response = await fetcher({ endPoint: `/web/designs/public/slug/${params?.slug}`, method: 'GET' });
  const { data, statusCode } = response;
  if (statusCode < 300) {
    return {
      props: {
        design: data,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default DesignView;