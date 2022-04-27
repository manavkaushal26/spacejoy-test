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
import { InteriorDesignMeta } from "@utils/meta";

const InteriorDesigns = ({ designFeedData }): JSX.Element => {
  return (
    <Layout>
      <Head>
      {InteriorDesignMeta}
				<title key="title">Interior Design Ideas For All Rooms In Your Home By {company.product}</title>
				<meta
					key="description"
					name="description"
					content="Explore collection of interior design ideas for your home. Find interior designs for bedroom, dining, kids & living room online. Get inspiration from interior design ideas now."
				/>
				<meta
					key="og-title"
					property="og:title"
					content={`Interior Design Ideas For All Rooms In Your Home By ${company.product}`}
				/>
				<meta
					key="og-description"
					property="og:description"
					content="Explore collection of interior design ideas for your home. Find interior designs for bedroom, dining, kids & living room online. Get inspiration from interior design ideas now."
				/>
				<meta key="og-url" property="og:url" content="https://www.spacejoy.com/interior-designs" />
				<meta
					key="og-image"
					property="og:image"
					content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,q_auto,w_600/v1593577044/web/seo/interior_design_page_jipats.jpg`}
				/>
				<meta key="og-image-width" property="og:image:width" content="600" />
				<meta key="og-image-height" property="og:image:height" content="400" />
				<meta
					key="twitter-title"
					name="twitter:title"
					content={`Interior Design Ideas For All Rooms In Your Home By ${company.product}`}
				/>
				<meta
					key="twitter-description"
					name="twitter:description"
					content="Explore collection of interior design ideas for your home. Find interior designs for bedroom, dining, kids & living room online. Get inspiration from interior design ideas now."
				/>
				<meta
					key="twitter-image"
					name="twitter:image"
					content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,q_auto,w_600/v1593577044/web/seo/interior_design_page_jipats.jpg`}
				/>
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
      <div className="container px-4 mx-auto xl:p-0 max-w-screen-xl">
        <CollectionList feedData={topCollections} />
        <ListFilter />
        <DesignList feedData={designFeedData} />
        <PreFooter />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const additionalParams = `?limit=${internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE}&skip=0`;
    const designRes = await fetcher({
      endPoint: `${publicRoutes.designFeed}${additionalParams}`,
      method: 'POST',
      body: { data: {} },
    });
    const { data: { list: designList = [] } = {}, statusCode } = designRes;
    if (statusCode <= 301) {
      return {
        props: {
          designFeedData: { list: designList, count: 500 },
        },
        revalidate: 1, //TODO: Recheck the doc Data Fetching
      };
    } else {
      throw new Error(statusCode);
    }
  } catch (e) {
    return {
      props: {
        error: e.message || 'Something went wrong',
      },
      revalidate: 1, //TODO: Recheck the doc Data Fetching
    };
  }
};

export default React.memo(InteriorDesigns);