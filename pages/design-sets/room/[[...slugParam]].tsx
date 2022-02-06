import { CollagesListInterface, CollageSubcategories } from '@components/Collages/interface';
import DesignSetGrid from '@components/RoomSelection/DesignSetGrid';
import RoomPageHeader from '@components/RoomSelection/RoomPageHeader';
import Layout from '@components/Shared/Layout';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import topCollages, { SlugToCategory } from '@utils/Mocks/topCollages';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsResult, NextPage } from 'next';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';

interface CollageViewProps {
  feedData?: {
    list: CollagesListInterface[];
    count: number;
  };
  slug: string;
  category?: string;
  error?: string;
  initialSubCategoryList?: CollageSubcategories[];
}

const CollageView: NextPage<CollageViewProps> = ({ slug, feedData, category, initialSubCategoryList }): JSX.Element => {
  const name = useMemo(() => {
    return slug.split('-').join(' ');
  }, [slug]);

  const [subCategoryList, setSubCategoryList] = useState(initialSubCategoryList);

  const selectedSubCategoryList = useMemo(() => {
    return subCategoryList?.filter((subCat) => subCat.selected);
  }, [subCategoryList]);

  // const [bg, setBg] = useState(colorList[colorList?.length - 1]);
  // const selectBgColor = (color: ColorListType) => {
  //   setBg(color);
  // PushEvent({
  //   category: 'Select Background',
  //   action: `Select Background | ${color.paintDetails}`,
  //   label: 'Design Set Background',
  // });
  // };

  // const onSubCatClick = (id) => {
  // PushEvent({
  //   category: 'Select Filter',
  //   action: `Select Filter | ${id}`,
  //   label: 'Design Set Filter',
  // });
  //   setSubCategoryList((prevState) =>
  //     prevState.map((subCat) => {
  //       if (subCat._id === id) {
  //         return {
  //           ...subCat,
  //           selected: !subCat?.selected,
  //         };
  //       }

  //       return { ...subCat };
  //     })
  //   );
  // };

  return (
    <Layout>
      <Head>
        <title>{name} | Spacejoy</title>
      </Head>
      <Layout.Header />
      <Layout.Body>
        <div className="container mx-auto px-4">
          <RoomPageHeader category={category} />
          <DesignSetGrid feedData={feedData} category={category} />
        </div>

        {/* {JSON.stringify(feedData)} */}
        {/* <CollageListFilter
          breadcrumb
          title={`${name} Crafted By Design Experts`}
          count={feedData?.count}
          bg={bg}
          setBg={selectBgColor}
          subCategory={{ subCategoryList, onClick: onSubCatClick }}
        />
          <CollageList
            selectedSubCategoryList={selectedSubCategoryList}
            bg={bg}
            feedData={feedData}
            category={category}
          /> */}
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { data } = await fetcher({
    endPoint: '/v1/collageCategories',
    method: 'GET',
  });

  return {
    paths: data?.map((entry) => {
      const { displayName } = entry;
      const slug = (displayName as string).split(' ').join('-').concat('-design-sets');

      return { params: { slugParam: [slug] } };
    }),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  ctx: GetServerSidePropsContext<{ slugParam: string[] }>
): Promise<GetServerSidePropsResult<CollageViewProps>> {
  const { params } = ctx;
  const { slugParam } = params;
  const [slug] = slugParam;
  const enabledCollages = topCollages.list.filter((collage) => !collage.disabled).map((collage) => collage.slug);

  if (enabledCollages.includes(slug)) {
    const category = SlugToCategory[slug];
    const { data } = await fetcher({ endPoint: publicRoutes?.collageCategoryRoute, method: 'GET' });

    const selectedCategory = data?.find((item) => item?.name === category);
    try {
      const { data: subCategories } = await fetcher({
        endPoint: `${publicRoutes?.collageCategoryRoute}/${selectedCategory._id}/subCategories`,
        method: 'GET',
      });

      const initialSubCategoryList = subCategories.map((subCat) => ({ ...subCat.subCategory, isSelected: false }));

      const additionalParams = `?limit=${internalPages.Collages.DEFAULT_PAGE_SIZE}&skip=0`;
      const designRes = await fetcher({
        endPoint: `${publicRoutes.collageBase}/search${additionalParams}`,
        method: 'POST',
        body: {
          filters: { category: [category], isActive: true },
          searchText: '',
          wildcard: true,
        },
      });
      const { data: { data: collageList = [], count = 0 } = {}, statusCode } = designRes;
      if (statusCode <= 301) {
        return {
          props: {
            feedData: { list: collageList, count: parseInt(count) },
            slug: slug,
            category,
            initialSubCategoryList,
          },
        };
      } else {
        throw new Error(statusCode);
      }
    } catch (e) {
      return {
        props: {
          error: e.message || 'Something went wrong',
          slug: slug,
        },
      };
    }
  }

  return {
    props: { slug: slug },
  };
}
export default CollageView;