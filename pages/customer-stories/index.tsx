import CollectionList from '@components/Collection/InjectCollectionList';
import DesignList from '@components/InteriorDesigns/DesignList';
import ListFilter from '@components/InteriorDesigns/ListFilter';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { cloudinary, company, internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import topCollections from '@utils/Mocks/topCollections';
import Head from 'next/head';
import React from 'react';
import { CustomerStoriesPageMeta, InteriorDesignBlogPageMeta } from '@utils/meta';
import BlogList from '@components/InteriorBlogs/BlogList';
import BlogIntro from '@components/InteriorBlogs/BlogIntro';
import CustomerStoriesIntro from '@components/CustomerStories/CustomerStoriesIntro';
import StoryList from '@components/CustomerStories/StoryList';

const CustomerStories = ({ storiesFeedData }): JSX.Element => {
  return (
    <Layout>
      <Head>
        {CustomerStoriesPageMeta}
        <title key="title">
          Real Homes, Real design. Online Interior Design Journey of {company.product} Customers
        </title>
        <meta
          key="description"
          name="description"
          content={`Find home design stories and reviews about ${company.product} from our happy customers. A look behind the scenes into our customers room transformations told directly by our clients`}
        />
        <meta
          key="og-title"
          property="og:title"
          content={`Real Homes, Real design. Online Interior Design Journey of ${company.product} Customers`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`Find home design stories and reviews about ${company.product} from our happy customers. A look behind the scenes into our customers room transformations told directly by our clients`}
        />
        <meta key="og-url" property="og:url" content="https://www.spacejoy.com/customer-stories" />
        <meta
          key="og-image"
          property="og:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,q_auto,w_600/v1593540173/web/seo/customer_stories_page_z5dxlk.jpg`}
        />
        <meta key="og-image-width" property="og:image:width" content="600" />
        <meta key="og-image-height" property="og:image:height" content="900" />
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Real Homes, Real design. Online Interior Design Journey of ${company.product} Customers`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`Find home design stories and reviews about ${company.product} from our happy customers. A look behind the scenes into our customers room transformations told directly by our clients`}
        />
        <meta
          key="twitter-image"
          name="twitter:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,q_auto,w_600/v1593540173/web/seo/customer_stories_page_z5dxlk.jpg`}
        />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 mx-auto xl:p-0 max-w-screen-xl">
          <CustomerStoriesIntro />
          <StoryList storiesFeedData={storiesFeedData} />
          <PreFooter />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const additionalParams = `?limit=${internalPages.CustomerStories.DEFAULT_PAGE_SIZE}&skip=0`;
    const storiesRes = await fetcher({
      endPoint: `${publicRoutes.customerStoriesList}${additionalParams}`,
      method: 'GET',
    });
    const { data, statusCode } = storiesRes;
    if (statusCode <= 301) {
      return {
        props: {
          storiesFeedData: data,
        },
        revalidate: 1,
      };
    } else {
      throw new Error(statusCode);
    }
  } catch (e) {
    return {
      props: {
        error: e.message || 'Something went wrong',
      },
      revalidate: 1,
    };
  }
};

export default React.memo(CustomerStories);
