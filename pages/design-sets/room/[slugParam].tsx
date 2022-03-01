import { CollagesListInterface, CollageSubcategories } from '@components/Collages/interface';
import DesignFilters from '@components/DeesignFIlters';
import DesignSetGrid from '@components/RoomSelection/DesignSetGrid';
import RoomPageHeader from '@components/RoomSelection/RoomPageHeader';
import Layout from '@components/Shared/Layout';
import { XIcon } from '@heroicons/react/outline';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import topCollages, { SlugToCategory } from '@utils/Mocks/topCollages';
import { RoomSelectSEO } from '@utils/SEO/roomSelectSEO';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
interface CollageViewProps {
  feedData?: {
    list: CollagesListInterface[];
    count: number;
  };
  slug: string;
  category?: string;
  error?: string;
  initialSubCategoryList?: CollageSubcategories[];
  tags: Array<string>;
  themes: Array<string>;
}

const CollageView: NextPage<CollageViewProps> = ({
  slug,
  feedData,
  category,
  initialSubCategoryList,
  tags,
  themes,
}): JSX.Element => {
  const name = useMemo(() => {
    return slug.split('-').join(' ');
  }, [slug]);

  let metaSEO = useMemo(() => {
    return RoomSelectSEO.find((item) => item?.slug === slug);
  }, []);

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

  const [tagFilters, setTagFilters] = useState([...tags]);

  const [themeFilters, setThemeFilters] = useState([...themes]);

  const updateTags = (tagValue, type) => {
    const currentTags = type === 'tag' ? [...tagFilters] : [...themeFilters];
    console.log('value', currentTags, tagValue, type);
    const indexOfChosenTag = currentTags?.indexOf(tagValue);

    if (indexOfChosenTag > -1) {
      currentTags.splice(indexOfChosenTag, 1);
    } else {
      currentTags.push(tagValue);
    }
    console.log(currentTags);
    type === 'tag' ? setTagFilters(currentTags) : setThemeFilters(currentTags);
  };
  const router = useRouter();

  useEffect(() => {
    if (tagFilters?.length) {
      router.query.tags = tagFilters?.join('::');
    } else {
      delete router?.query?.tags;
    }
    router.query.pathname = router?.pathname;
    router.push(router, undefined, { shallow: true });
  }, [tagFilters]);

  useEffect(() => {
    if (themeFilters?.length) {
      router.query.themes = themeFilters?.join('::');
    } else {
      delete router?.query?.themes;
    }
    router.query.pathname = router?.pathname;
    router.push(router, undefined, { shallow: true });
  }, [themeFilters]);

  return (
    <Layout>
      <Head>
        <title>{`${name?.[0].toUpperCase()}${name?.slice(1)}`} | Spacejoy</title>
        <base href="/" />
      </Head>
      <Layout.Header />
      <Layout.Body>
        <div className="bg-gray-100">
          <div className="container mx-auto px-4">
            <RoomPageHeader category={category} />
            {/* <DesignSetBanner /> */}
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-1 p-4 bg-white rounded-lg border ">
                <DesignFilters updateTags={updateTags} tagFilters={tagFilters} appliedThemeFilters={themeFilters} />
              </div>
              <div className="col-span-4 rounded">
                {themeFilters?.length ? (
                  <div className="mb-4">
                    {themeFilters?.map((item, index) => {
                      return (
                        <button
                          className={`bg-white text-gray-900  py-2 px-4 rounded-full capitalize text-sm text-gray-900 border inline-flex items-center justify-center ${
                            index > 0 ? 'ml-2' : ''
                          }`}
                          key={item}
                          onClick={() => {
                            updateTags(item, 'theme');
                          }}
                        >
                          {item} <XIcon className="h-4 w-4 ml-2" />
                        </button>
                      );
                    })}
                    {tagFilters?.map((item, index) => {
                      return (
                        <button
                          className={`bg-white text-gray-900  py-2 px-4 rounded-full capitalize text-sm text-gray-900 border inline-flex items-center justify-center ${
                            index > 0 ? 'ml-2' : ''
                          }`}
                          key={item}
                          onClick={() => {
                            updateTags(item, 'tag');
                          }}
                        >
                          {item} <XIcon className="h-4 w-4 ml-2" />
                        </button>
                      );
                    })}
                    <button
                      className="py-2 px-4 underline text-sm"
                      onClick={() => {
                        setTagFilters([]);
                        setThemeFilters([]);
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                ) : null}

                <DesignSetGrid
                  feedData={feedData}
                  category={category}
                  tagFilters={tagFilters}
                  themeFilters={themeFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{ slugParam: string }>
): Promise<GetServerSidePropsResult<CollageViewProps>> {
  const { params, query } = ctx;

  const { tags = [], themes = [] } = query;

  const tagList = tags?.length ? (tags as string)?.split('::') : [];
  const themesList = themes?.length ? (themes as string)?.split('::') : [];
  const { slugParam: slug } = params;
  const enabledCollages = topCollages.list.filter((collage) => !collage.disabled).map((collage) => collage.slug);

  if (enabledCollages.includes(slug as string)) {
    const category = SlugToCategory[slug as string];
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
          filters: { category: [category], isActive: true, tags: tagList, themes: themesList },
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
            tags: [...tagList],
            themes: [...themesList],
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
          tags: [],
          themes: [...themesList],
        },
      };
    }
  }

  return {
    props: { slug: slug, tags: [...tagList], themes: [...themesList] },
  };
}
export default CollageView;
