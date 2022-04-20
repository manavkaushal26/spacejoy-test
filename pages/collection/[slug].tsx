import CollectionBanner from '@components/Collection/Banner';
import DesignList from '@components/InteriorDesigns/DesignList';
import ListFilter from '@components/InteriorDesigns/ListFilter';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { cloudinary, internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { CollectionPageMeta } from '@utils/meta';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

type CollectionPage = {
  designFeedData: {
    list: [];
    count: number;
    filters?: any;
  };
  collectionData: {
    name?: string;
    description?: string;
    coverImg?: string;
    slug?: string;
    publishedDate?: string;
    status?: string;
    metaTitle?: string;
    metaDescription?: string;
    cdnCover?:string;
  };
};

const collectionView: React.FC<CollectionPage> = ({ designFeedData, collectionData }) => {
  return (
    <Layout>
      {/* <Head>
      {CollectionPageMeta}
						{collectionData.metaTitle && <title key="title">{collectionData.metaTitle}</title>}
						{collectionData.metaDescription && (
							<meta key="description" name="description" content={collectionData.metaDescription} />
						)}
						{collectionData.slug && (
							<link
								key="canonical"
								rel="canonical"
								href={`https://www.spacejoy.com/interior-designs/${collectionData.slug}`}
							/>
						)}
						<meta key="og-title" property="og:title" content={collectionData.metaTitle} />
						<meta key="og-description" property="og:description" content={collectionData.metaDescription} />
						<meta
							key="og-url"
							property="og:url"
							content={`https://www.spacejoy.com/interior-designs/${collectionData.slug}`}
						/>
						<meta
							key="og-image"
							property="og:image"
							content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_700/${collectionData.cdnCover}`}
						/>
						<meta key="og-image-width" property="og:image:width" content="700" />
						<meta key="og-image-height" property="og:image:height" content="394" />
						<meta key="twitter-title" name="twitter:title" content={collectionData.metaTitle} />
						<meta key="twitter-description" name="twitter:description" content={collectionData.metaDescription} />
						<meta
							key="twitter-image"
							name="twitter:image"
							content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_700/${collectionData.cdnCover}`}
						/>
      </Head> */}
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <CollectionBanner data={collectionData} />
        {/* <ListFilter /> */}
        <DesignList feedData={designFeedData} />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = [
    'bedroom-ideas',
    'living-room-ideas',
    'entryway-ideas',
    'home-office-ideas',
    'kids-room-ideas',
    'nursery-ideas',
  ];
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const endPoint = `${publicRoutes.collectionData}/${params?.slug}`;
  const res = await fetcher({ endPoint, method: 'GET' });
  const { data, statusCode } = res;
  if (statusCode <= 301) {
    const additionalParams = `?limit=${internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE}&skip=0`;
    const designRes = await fetcher({
      endPoint: `${publicRoutes.designFeed}${additionalParams}`,
      method: 'POST',
      body: { data: data?.searchKey || {} },
    });
    const { data: designData = {}, statusCode: designResStatus } = designRes;
    if (designResStatus < 301) {
      const { list: designList = [] } = designData;

      return {
        props: {
          designFeedData: { list: designList, count: 500, filters: data?.searchKey },
          collectionData: {
            name: data?.name,
            description: data?.description,
            coverImg: data?.cdnCover,
            slug: data?.slug,
            publishedDate: data?.publishedDate,
            status: data?.status,
            metaTitle: data?.metaTitle,
            metaDescription: data?.metaDescription,
          },
        },
        revalidate: 1,
      };
    } else {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

export default React.memo(collectionView);