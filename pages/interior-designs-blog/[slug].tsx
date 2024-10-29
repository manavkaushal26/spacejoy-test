import CustomerStories from '@components/EngagementBlocks/CustomerStories';
import EditorPick from '@components/EngagementBlocks/EditorPick';
import SimilarPicksCarousel from '@components/EngagementBlocks/SimilarPicksCarousel';
import { Blog, BlogData } from '@components/InteriorBlogs/BlogInterface';
import Layout from '@components/Shared/Layout';
import { cloudinary, company } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';
import parse from 'react-html-parser';
import styled from 'styled-components';
import { getEngagementsBlocks } from '@components/EngagementBlocks/Utils';
import CustomerStoriesCarousel from '@components/EngagementBlocks/CustomerStoriesCarousel';
import PreFooter from '@components/Shared/PreFooter';

const StoryBodyStyled = styled.div`
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: #555;

    span {
      font-size: 1rem;
    }

    a {
      color: #f5296e;
      text-decoration: underline;
      background-color: transparent !important;
      &:hover {
        color: #dd2663;
      }
    }

    strong {
      font-weight: bold;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #222;

    strong {
      font-weight: bold;
    }

    a {
      color: #f5296e;
      text-decoration: underline;
      background-color: transparent !important;
      &:hover {
        color: #dd2663;
      }
    }
  }

  ul {
    margin-left: 1.5rem;
    list-style: disc;
    margin-bottom: 2rem;

    li {
      margin-bottom: 0.75rem;
      font-size: 1rem;

      p {
        margin: 0;
        span {
          font-size: 1rem;
        }
      }
    }
  }
`;

interface Props {
  data: BlogData;
  engagementBlockData: any;
}

const blogView: React.FC<Props> = ({ data, engagementBlockData }) => {
  const children =
    data?.blogType === 'full'
      ? parse(data?.renderBody[0])
      : data?.renderBody?.map((text) => {
          return <div key={text}>{parse(text)}</div>;
        });

  const { customerData, editorPickData, similarPicksData, categoryData } = engagementBlockData;

  return (
    <Layout>
      <Head>
        {IndexPageMeta}
        <title key="title">
          {data?.metaTitle} | {company.product}
        </title>
        {data?.slug && (
          <link key="canonical" rel="canonical" href={`https://www.spacejoy.com/interior-designs-blog/${data?.slug}`} />
        )}
        <meta name="publish-date" content={data?.publishDate} />
        <meta name="created-date" content={data?.publishDate} />
        <meta name="modified-date" content={data?.updatedAt} />
        <meta key="description" name="description" content={data?.metaDescription} />
        <meta key="og-title" property="og:title" content={`${data?.metaTitle} | ${company.product}`} />
        <meta key="og-description" property="og:description" content={data?.metaDescription} />
        <meta key="og-url" property="og:url" content={`https://www.spacejoy.com/interior-designs-blog/${data?.slug}`} />
        <meta
          key="og-image"
          property="og:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/fl_lossy,f_auto,q_auto,w_600/${data?.socialImgCdn}`}
        />
        <meta key="og-image-width" property="og:image:width" content="600" />
        <meta key="og-image-height" property="og:image:height" content="338" />
        <meta key="twitter-title" name="twitter:title" content={`${data?.metaTitle} | ${company.product}`} />
        <meta key="twitter-description" name="twitter:description" content={data?.metaDescription} />
        <meta
          key="twitter-image"
          name="twitter:image"
          content={`${cloudinary.baseDeliveryURL}/image/upload/fl_lossy,f_auto,q_auto,w_600/${data?.socialImgCdn}`}
        />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container max-w-screen-xl px-4 mx-auto xl:p-0">
          <div className="flex flex-col space-y-5 md:flex-row md:space-x-5">
            <div className="p-5 md:basis-2/3">
              <div className="mt-2 mb-8">
                {data?.category.title && (
                  <h3 className="mb-1 text-2xl capitalize sm:text-4xl sm:mb-2">{data?.category.title}</h3>
                )}
                <p className="text-xs sm:text-base">{data?.title}</p>
              </div>
              <StoryBodyStyled>
                {data?.blogType === 'full' ? children : <div className="items-start ">{children}</div>}
              </StoryBodyStyled>
            </div>
            <div className="flex flex-col m-5 space-y-8 md:basis-1/3 h-fit sm:shadow-2xl">
              <div>
                {editorPickData.length && (
                  <div className="p-5 mt-3 rounded-lg shadow-none">
                    <h2 className="text-xl font-bold ">Editors Pick</h2>
                    <p className="text-sm ">Explore editors design</p>
                    <EditorPick data={editorPickData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" bg-[#fef7ef] mt-8 rounded-lg md:mx-4">
            {customerData.length && (
              <div className="p-5 mt-3 shadow-none">
                <h2 className="text-xl font-bold ">Customer Stories</h2>
                <p className="mb-5 text-sm ">Explore customer designs</p>
                <CustomerStoriesCarousel data={customerData} />
              </div>
            )}
          </div>
          <div className=" bg-[#f8f8f8] mt-8 rounded-lg md:mx-4">
            {categoryData.length && (
              <div className="p-5 mt-3 shadow-none">
                <h2 className="text-xl font-bold ">Categories</h2>
                <p className="text-sm ">Explore other categories</p>
                <SimilarPicksCarousel data={categoryData} />
              </div>
            )}
          </div>
        </div>
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const blogRes = await fetcher({
      endPoint: `${publicRoutes.interiorDesignsBlogBySlug}/${params?.slug}`,
      method: 'GET',
    });
    const queryParams = '?&limit=5';
    const engagementBlockData = await getEngagementsBlocks(queryParams);
    const { data, statusCode } = blogRes;
    if (statusCode <= 301) {
      return {
        props: {
          data,
          engagementBlockData,
        },
      };
    } else {
      throw new Error(statusCode);
    }
  } catch (e) {
    return {
      props: {
        error: e.message || 'Something went wrong',
      },
    };
  }
};

export default React.memo(blogView);
