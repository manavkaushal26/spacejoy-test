import Breadcrumb from '@components/InteriorDesigns/Breadcrumb';
import ImageGrid from '@components/InteriorDesigns/ImageGrid';
import { DesignViewInterface } from '@components/InteriorDesigns/types';
import DesignerCard from '@components/Shared/DesignerCard';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { imageKit } from '@utils/config';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import React from 'react';

const DesignView = ({ design }) => {
  return (
    <Layout>
      <Head>
        <title>{design?.name} | Spacejoy</title>
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="bg-gray-100">
          <div className="container px-4 mx-auto">
            {/* <Breadcrumb design={design} /> */}
            <h2 className="my-8 text-3xl tracking-wide">{design?.name}</h2>
            <ImageGrid images={design?.cdnRender} />
            <h3 className="mt-20 mb-8 text-2xl tracking-wide text-gray-700">Shop the products featured in this room</h3>
            <div className="flex flex-col my-8 space-y-4 sm:flex-row sm:space-x-4 2xl:space-x-8">
              <div className="sm:w-3/5 xl:w-3/4">
                <div className="grid h-full grid-cols-2 gap-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
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
              <div className="sm:w-2/5 xl:w-1/4">
                <div className="sticky top-24 2xl:top-28">
                  {/* <DesignerCard /> */}
                  <div className="p-4 mt-4 bg-white rounded-lg 2xl:p-8 2xl:mt-8">
                    <h3 className="mb-4 text-lg">About the Design</h3>
                    <p className="mb-6 text-sm text-gray-500">{design?.description}</p>
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
      { slug: 'best-selling-home-decor-and-furniture-pieces-of-2021' },
      { slug: 'make-your-entryway-more-welcoming-this-christmas' },
      { slug: 'beautiful-and-bright-a-modern-rustic-dining-room' },
      { slug: 'colorful-mid-century-modern-living-room-with-rattan-furniture' },
      { slug: 'a-transitional-living-dining-room-with-rustic-accents' },
      { slug: 'mid-century-modern-balcony-design-with-a-green-ceiling' },
      { slug: 'mid-century-modern-coastal-living-room' },
      { slug: 'pine-green-rustic-farmhouse-dining-room' },
      { slug: 'modern-and-trendy-boho-living-room-with-japandi-decor' },
      { slug: 'industrial-glam-living-room-with-mustard-accents' },
      { slug: 'transitional-home-office-with-a-sleeper-sofa' },
      { slug: 'an-art-deco-glam-bedroom-with-bold-walls-and-metallic-accents' },
      { slug: 'urban-rustic-kids-bedroom-with-twin-beds' },
      { slug: 'contemporary-transitional-open-concept-living-dining-room' },
      { slug: 'white-and-beach-themed-modern-bedroom-decor' },
      { slug: 'galaxy-themed-blue-childrens-room-with-star-bedding' },
      { slug: 'mid-century-glam-living-dining-room-with-mettalic-accents' },
    ],
  };
};

export default DesignView;
