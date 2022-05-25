import CollectionBanner from '@components/Collection/Banner';
import DesignList from '@components/InteriorDesigns/DesignList';
import ListFilter from '@components/InteriorDesigns/ListFilter';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { cloudinary, company, internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
    cdnThumbnail?: string;
  };
};

const CollectionView: React.FC<CollectionPage> = ({ designFeedData, collectionData }) => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Explore {collectionData?.name} By Spacejoy</title>
        {/* <!-- Primary Meta --> */}
        <meta name="title" content={`Explore ${collectionData?.name} By Spacejoy`} />
        <meta
          name="description"
          content={`Discover stunning ${collectionData?.name.toLowerCase()} and interior decorating ideas for your space. Explore and shop beautiful designs for every style & budget, curated by top designers.`}
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${company.url}${router.asPath}`} />
        <meta property="og:title" content={`Explore ${collectionData?.name} By Spacejoy`} />
        <meta
          property="og:description"
          content={`Discover stunning ${collectionData?.name.toLowerCase()} and interior decorating ideas for your space. Explore and shop beautiful designs for every style & budget, curated by top designers.`}
        />
        <meta property="og:image" content={`${cloudinary.baseDeliveryURL}/${collectionData?.coverImg}`} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:url" content={`${company.url}${router.asPath}`} />
        <meta property="twitter:title" content={`Explore ${collectionData?.name} By Spacejoy | Spacejoy`} />
        <meta
          property="twitter:description"
          content={`Discover stunning ${collectionData?.name.toLowerCase()} and interior decorating ideas for your space. Explore and shop beautiful designs for every style & budget, curated by top designers.`}
        />
        <meta property="twitter:image" content={`${cloudinary.baseDeliveryURL}/${collectionData?.coverImg}`} />
        <link rel="canonical" href={`${company.url}${router.asPath}`} />
        <base href="/" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className=" container lg:px-48">
          <CollectionBanner data={collectionData} />
          <DesignList feedData={designFeedData} />
          <PreFooter />
        </div>
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
    'dining-room-ideas',
    'modern-style-ideas',
    'eclectic-room-designs',
    'farmhouse-style-ideas',
    'industrial-room-designs',
    'mid-century-modern-room-ideas',
    'transitional-style-ideas',
    'classic-modern-design-ideas',
    'coastal-design-ideas',
    'open-living-and-dining-room-ideas',
  ];
  const paths = slugs.map((slug) => ({
    params: { collectionSlug: slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const endPoint = `${publicRoutes.collectionData}/${params?.collectionSlug}`;
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
            cdnThumbnail: data?.cdnThumbnail,
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

export default React.memo(CollectionView);
