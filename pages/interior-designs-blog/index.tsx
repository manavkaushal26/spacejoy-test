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
import { InteriorDesignBlogPageMeta } from '@utils/meta';
import BlogList from '@components/InteriorBlogs/BlogList';
import { BlogListInterface } from '@components/InteriorBlogs/BlogListInterface';
import BlogIntro from '@components/InteriorBlogs/BlogIntro';

const InteriorDesignsBlogs = ({ blogFeedData }): JSX.Element => {

  return (
    <Layout>
      <Head>
        {InteriorDesignBlogPageMeta}
        <title key="title">{company.product} Blog - Best and Latest Interior Designs, Home Decor Tips & Guides</title>
        <meta
          key="description"
          name="description"
          content={`Explore interior design tips, DIY decor, home decor guides & ideas on  ${company.product}. Follow our interior design blog to stay updated about the latest trends in interior designing`}
        />
        <meta
          key="og-title"
          property="og:title"
          content={`${company.product} Blog - Best and Latest Interior Designs, Home Decor Tips & Guides`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`Explore interior design tips, DIY decor, home decor guides & ideas on  ${company.product}. Follow our interior design blog to stay updated about the latest trends in interior designing`}
        />
        <meta key="og-url" property="og:url" content="https://www.spacejoy.com/interior-designs-blog" />
        <meta
          key="og-image"
          property="og:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_600/v1593540130/web/seo/blogs_page_tpdcla.jpg`}
        />
        <meta key="og-image-width" property="og:image:width" content="600" />
        <meta key="og-image-height" property="og:image:height" content="600" />
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`${company.product} Blog - Best and Latest Interior Designs, Home Decor Tips & Guides`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`Explore interior design tips, DIY decor, home decor guides & ideas on  ${company.product}. Follow our interior design blog to stay updated about the latest trends in interior designing`}
        />
        <meta
          key="twitter-image"
          name="twitter:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,w_600/v1593540130/web/seo/blogs_page_tpdcla.jpg`}
        />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 mx-auto xl:p-0 max-w-screen-xl">
          <BlogIntro />
          <BlogList data={blogFeedData} />
          <PreFooter />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const additionalParams = `?limit=${internalPages.InteriorDesignsBlog.DEFAULT_PAGE_SIZE}&skip=0`;
    const blogRes = await fetcher({
      endPoint: `${publicRoutes.interiorDesignsBlogList}${additionalParams}`,
      method: 'GET',
    });
    const { data, statusCode } = blogRes;
    if (statusCode <= 301) {
      return {
        props: {
          blogFeedData: data,
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

export default React.memo(InteriorDesignsBlogs);
