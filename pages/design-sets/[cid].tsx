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
import { cloudinary } from '@utils/config';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import fetcher from '@utils/fetcher';
import { onlyUnique, priceToLocaleString } from '@utils/helpers';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useRef } from 'react';

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
  const shopDetailsRef = useRef<HTMLDivElement>();
  const PlaygroundWrapperRef = useRef<HTMLDivElement>(null);

  const isMobile = Cookies.get('isMobile');

  const onTotalClick = () => {
    shopDetailsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const priceOfSet = useMemo(() => {
    return mainCategories.reduce((acc, curr) => {
      if (!acc) {
        return groupedAssetList?.[curr?.id]?.price;
      }

      return acc;
    }, 0);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{`${correctedCollageName?.[0]?.toLocaleUpperCase()}${correctedCollageName?.slice(1)}`} | Spacejoy</title>
      </Head>
      <Layout.Banner />
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
                        {isMobile === 'true' ? (
                          <div className="space-y-4">
                            <div className="relative aspect-2">
                              <Image
                                src={`${cloudinary.baseDeliveryURL}/${collageData.thumbnail}`}
                                alt=""
                                layout="fill"
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`bg-white  aspect-[16/8]    flex-1 rounded-xl overflow-hidden relative `}
                            ref={PlaygroundWrapperRef}
                          >
                            <button
                              onClick={onTotalClick}
                              className="mb-0 absolute top-4 right-4 z-20 bg-white/70 hover:bg-white/40  p-2 rounded-md font-bold"
                            >
                              {/* Total: {priceToLocaleString(priceOfSet)} */}
                              Shop Now
                            </button>
                            {/* // TODO This codeblock will be replaced with editor code */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* <Image
                            src={`${cloudinary.baseDeliveryURL}/e_trim,q_auto,ar_1.5,c_pad/${collageData?.thumbnail}`}
                            alt={correctedCollageName}
                            className="rounded-xl"
                            layout="fill"
                            objectFit="contain"
                          /> */}
                            <PlaygroundWithNoSSR
                              collageData={collageData}
                              playGroundRef={PlaygroundWrapperRef}
                              bg={{ value: collageData?.background, type: collageData?.bgType }}
                            />
                            <ControlPanel designSetId={collageData?._id} />
                          </div>
                        )}
                        <div ref={shopDetailsRef}>
                          <DesignSetDetails collageData={collageData} correctedCollageName={correctedCollageName} />
                        </div>
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

export const getServerSideProps = async ({ params }) => {
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
          data: { categoryMap, background = '', bgType = '' },
        } = collageRes;
        const { category: { _id: categoryId = '' } = {} } = categoryMap || {};
        if (statusCode <= 301) {
          const collageProductIds = data?.meta?.view?.map((product) => product?.product);
          const productRes = await fetcher({
            endPoint: '/v1/assets/getAssetsDetail',
            body: {
              assets: [...collageProductIds],
              fields: [
                'price',
                'name',
                'renderImages',
                'retailer',
                'dimension',
                'meta',
                'imageUrl',
                'cdn',
                'inStock',
                'status',
              ],
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
                bgType,
              },
              assets: productData || [],
              groupedAssetList: groupedAssetList || {},
            },
            // revalidate: 1, //TODO: Recheck the doc Data Fetching
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
