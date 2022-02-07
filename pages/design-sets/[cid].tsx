import { CollagesListInterface } from '@components/Collages/interface';
import { AssetType } from '@components/Collection/AssetType';
import ControlPanel from '@components/Playground/ControlPanel';
import DesignSetDetails from '@components/Playground/DesignSetDetails';
import Layout from '@components/Shared/Layout';
import { blurredBgProduct } from '@public/images/bg-base-64';
import CollageListContextProvider from '@store/CollageList';
import { DataBusContextProvider } from '@store/DataBus';
import DesignSetAssetProvider from '@store/DesignSetAssetProvider';
import { NavSelectContextProvider } from '@store/NavSelect';
import { PlaygroundAssetsContextProvider } from '@store/PlaygroundAssets';
import RecommendationsListContextProvider from '@store/RecommendationsList';
import { SelectedIdContextProvider } from '@store/SelectedId';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import fetcher from '@utils/fetcher';
import { onlyUnique } from '@utils/helpers';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const PlaygroundWithNoSSR = dynamic(() => import('@components/Playground'), { ssr: false });

interface CollageViewProps {
  assets: Record<string, AssetType>;
  collageData: CollagesListInterface;
  groupedAssetList: Record<string, { price: number; assets: AssetType[] }>;
}

const SingleCollageSet: NextPage<CollageViewProps> = ({ assets, collageData, groupedAssetList }): JSX.Element => {
  const correctedCollageName = useMemo(() => {
    return collageData?.name?.split('-').join(' ').slice(0, -10);
  }, [collageData]);

  const PlaygroundWrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState([0, 0]);
  const updateSize = () =>
    setSize([PlaygroundWrapperRef.current?.offsetWidth, PlaygroundWrapperRef.current?.offsetHeight]);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{correctedCollageName} | Spacejoy</title>
      </Head>
      <Layout.Header />
      <Layout.Body>
        <NavSelectContextProvider>
          <DesignSetAssetProvider initialAssets={assets} initialGroupedData={groupedAssetList}>
            <SelectedIdContextProvider>
              <PlaygroundAssetsContextProvider>
                <DataBusContextProvider>
                  <RecommendationsListContextProvider>
                    <CollageListContextProvider>
                      <div className="container px-4 m-auto">
                        <div
                          className="bg-white  aspect-[16/8]  flex-1 rounded-xl overflow-hidden relative"
                          ref={PlaygroundWrapperRef}
                        >
                          {/* // TODO This codeblock will be replaced with editor code */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {/* <Image
                            src={`${cloudinary.baseDeliveryURL}/e_trim,q_auto,ar_1.5,c_pad/${collageData?.thumbnail}`}
                            alt={correctedCollageName}
                            className="rounded-xl"
                            layout="fill"
                            objectFit="contain"
                          /> */}
                          <PlaygroundWithNoSSR w={size[0]} h={size[1]} collageData={collageData} />
                          <ControlPanel />
                        </div>
                        <DesignSetDetails collageData={collageData} correctedCollageName={correctedCollageName} />
                      </div>
                    </CollageListContextProvider>
                  </RecommendationsListContextProvider>
                </DataBusContextProvider>
              </PlaygroundAssetsContextProvider>
            </SelectedIdContextProvider>
          </DesignSetAssetProvider>
        </NavSelectContextProvider>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default SingleCollageSet;

export const getStaticPaths = async () => {
  const { data } = await fetcher({
    endPoint: '/v1/collages?skip=0&limit=100&isActive=true',
    method: 'GET',
  });

  return {
    paths: data?.data?.map((collage) => ({ params: { cid: collage?._id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { cid } = params;
  if (cid) {
    if (cid) {
      try {
        const collageRes = await fetcher({
          endPoint: `/v1/collages/${cid}`,
          method: 'GET',
        });
        const { data = {}, statusCode } = collageRes;
        const {
          data: { categoryMap },
          background = '',
        } = collageRes;
        const { category: { _id: categoryId = '' } = {} } = categoryMap || {};
        if (statusCode <= 301) {
          const collageProductIds = data?.meta?.view?.map((product) => product?.product);
          const productRes = await fetcher({
            endPoint: '/v1/assets/getAssetsDetail',
            body: {
              assets: [...collageProductIds],
              fields: ['price', 'name', 'renderImages', 'retailer', 'dimension', 'meta', 'imageUrl', 'cdn'],
            },
            method: 'POST',
          });
          const { data: productData = {}, statusCode: status } = productRes;
          const isError = status < 300 ? false : true;
          if (isError) throw new Error();

          // Getting unique data during page build for SEO

          const uniqueAssetList =
            Object.keys(productData)
              ?.filter(onlyUnique)
              .filter((key) => key !== 'price') || [];

          const mainCategoryList = mainCategories.map((value) => value.id);

          const groupedAssetList = uniqueAssetList.reduce((acc, assetId) => {
            const asset = productData[assetId];
            if (asset.price > 0) {
              if (!asset?.cdn) {
                const renderedImagecdn = asset?.renderImages?.[0]?.cdn;
                asset.cdn = renderedImagecdn || blurredBgProduct;
              }
              const category = asset?.meta?.category?._id;
              const isMainCategory = mainCategoryList.includes(category);
              const categoryEntry = acc[isMainCategory ? category : 'addOn'] || { assets: [], price: 0 };
              categoryEntry.assets.push(asset);
              categoryEntry.price += asset?.price;
              acc[isMainCategory ? category : 'addOn'] = categoryEntry;
            }

            return acc;
          }, {});

          const collageDataWithProductData = {
            type: 'collage',
            id: cid,
            data: data?.meta?.view?.map((object) => {
              const {
                translation: {
                  x: { $numberDecimal: xCoord } = { $numberDecimal: '' },
                  y: { $numberDecimal: yCoord } = { $numberDecimal: '' },
                } = {},
                scale: {
                  height: { $numberDecimal: heightCoord = '' },
                  width: { $numberDecimal: widthCoord = '' },
                },
                playgroundScale: {
                  height: { $numberDecimal: actualHeightCoord = '' } = {},
                  width: { $numberDecimal: actualWidthCoord = '' } = {},
                } = {},
                rotation = '0',
                imgSrc,
              } = object;

              return {
                x: parseFloat(xCoord),
                y: parseFloat(yCoord),
                height: parseFloat(heightCoord),
                width: parseFloat(widthCoord),
                assetId: object?.product,
                rotationValue: rotation,
                stitchedAssetImage: imgSrc,
                count: 12,
                ...(actualWidthCoord && { playgroundWidth: parseFloat(actualWidthCoord) }),
                ...(actualHeightCoord && { playgroundHeight: parseFloat(actualHeightCoord) }),
                id: `in-playground-asset-${Math.random()}`,
                price: !isError ? productData?.[object?.product]?.price || 0 : 0,
                displayPrice: !isError ? productData?.[object?.product]?.price || 0 : 0,
                retailer: !isError ? productData?.[object?.product]?.retailer?.name || '' : '',
                renderImages: !isError ? productData?.[object?.product]?.renderImages || [{ cdn: '' }] : [{ cdn: '' }],
                name: !isError ? productData?.[object?.product]?.name || '' : '',
                depth: !isError ? productData?.[object?.product]?.dimension?.depth || 0 : 0,
                vertical: !isError ? productData?.[object?.product]?.meta?.vertical?.name || '' : '',
              };
            }),
          };

          return {
            props: {
              collageData: {
                ...collageRes?.data,
                ...collageDataWithProductData,
                categoryId,
                background,
              },
              assets: productData || [],
              groupedAssetList: groupedAssetList || {},
            },
            revalidate: 1, //TODO: Recheck the doc Data Fetching
          };
        } else {
          throw new Error(statusCode);
        }
      } catch (e) {
        return {
          props: {
            notFound: true,
          },
        };
      }
    } else {
      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
};
