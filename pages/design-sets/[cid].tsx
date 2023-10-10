import { CollagesListInterface } from '@components/Collages/interface';
import { AssetType } from '@components/Collection/AssetType';
import ControlPanel from '@components/Playground/ControlPanel';
import DesignSetDetails from '@components/Playground/DesignSetDetails';
import Layout from '@components/Shared/Layout';
import WishListBtn from '@components/Shared/WishListBtn';
import { blurredBgProduct } from '@public/images/bg-base-64';
import CollageListContextProvider from '@store/CollageList';
import { DataBusContextProvider } from '@store/DataBus';
import DesignSetAssetProvider from '@store/DesignSetAssetProvider';
import { NavSelectContextProvider } from '@store/NavSelect';
import { PlaygroundAssetsContextProvider } from '@store/PlaygroundAssets';
import RecommendationsListContextProvider from '@store/RecommendationsList';
import { SelectedIdContextProvider } from '@store/SelectedId';
import { cloudinary, company, imageKit } from '@utils/config';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import fetcher from '@utils/fetcher';
import { onlyUnique } from '@utils/helpers';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo, useRef } from 'react';

const PlaygroundWithNoSSR = dynamic(() => import('@components/Playground'), { ssr: false });

interface CollageViewProps {
  assets: Record<string, AssetType>;
  collageData: CollagesListInterface;
  groupedAssetList: Record<string, { price: number; assets: AssetType[] }>;
}

const SingleCollageSet: NextPage<CollageViewProps> = ({ assets, collageData, groupedAssetList }): JSX.Element => {
  const router = useRouter();
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

        {/* <meta property="og:type" content="website" />
        <meta property="og:url" content={`${company.url}${router.asPath}`} />
        <meta
          property="og:title"
          content={`${correctedCollageName?.[0]?.toLocaleUpperCase()}${correctedCollageName?.slice(1)} | Spacejoy`}
        />
        <meta property="og:image" content={`${imageKit.baseDeliveryUrl}/${collageData.thumbnail}`} />

        <meta property="twitter:url" content={`${company.url}${router.asPath}`} />
        <meta
          property="twitter:title"
          content={`${correctedCollageName?.[0]?.toLocaleUpperCase()}${correctedCollageName?.slice(1)} | Spacejoy`}
        />
        <meta property="twitter:image" content={`${imageKit.baseDeliveryUrl}/${collageData.thumbnail}`} />

        <link rel="canonical" href={`${company.url}${router.asPath.split('?')[0]}`} /> */}
        <base href="/" />
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
                            <div className="relative mt-12 aspect-2">
                              <button className="absolute top-0 right-0 z-20 p-2 mb-0 font-bold rounded-md bg-white/70 hover:bg-white/40">
                                <WishListBtn type="Collage" documentId={collageData?._id} />
                              </button>
                              <Image
                                src={`${imageKit.baseDeliveryUrl}/${collageData?.thumbnail}`}
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
                            <button className="absolute top-0 z-20 p-2 mb-0 font-bold rounded-md right-32 bg-white/70 hover:bg-white/40">
                              <WishListBtn type="Collage" documentId={collageData?._id} />
                            </button>
                            <button
                              onClick={onTotalClick}
                              className="absolute z-20 p-2 mb-0 font-bold rounded-md top-4 right-4 bg-white/70 hover:bg-white/40"
                            >
                              {/* Total: {priceToLocaleString(priceOfSet)} */}
                              Shop Now
                            </button>
                            {/* // TODO This codeblock will be replaced with editor code */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* <Image
                            src={`${imageKit.baseDeliveryUrl}/e_trim,q_auto,ar_1.5,c_pad/${collageData?.thumbnail}`}
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
  const designId = cid && cid?.includes('-') ? cid?.split('-')?.pop() : cid;

  if (designId) {
    if (designId) {
      try {
        const collageRes = await fetcher({
          endPoint: `/v1/collages/${designId}`,
          method: 'GET',
        });

        const { data = {}, statusCode } = collageRes;
        const {
          data: { categoryMap, background = '', bgType = '' },
        } = collageRes;
        const { category: { _id: categoryId = '' } = {} } = categoryMap || {};
        if (statusCode <= 301) {
          if (!cid.includes('-')) {
            return {
              redirect: {
                permanent: true,
                destination: `/design-sets/${collageRes?.data?.slug?.split('-')?.slice(0, -1).join('-')}-${designId}`,
              },
            };
          } else {
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
                  'slug',
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
              id: designId,
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
                  renderImages: !isError
                    ? productData?.[object?.product]?.renderImages || [{ cdn: '' }]
                    : [{ cdn: '' }],
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
          }
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
