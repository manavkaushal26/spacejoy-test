import { useStore } from '@lib/offerStore';
import fetcher from '@utils/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

const fetchTagFromType = async (tagTypeId) => {
  const { data, statusCode } = await fetcher({
    endPoint: `/v1/tagTypes/${tagTypeId}/tags`,
    method: 'GET',
  });
  if (statusCode < 300) {
    return data;
  }
};

const useDesignSetTags = (tagId = '', roomType = '') => {
  const { tagTypes, setTags, updateTagData, updateActive, themeFilters, saveThemeFilters } = useStore(
    (store) => ({
      tagTypes: store.tagTypes,
      setTags: store.setTags,
      updateTagData: store.updateTagData,
      updateActive: store?.updateActiveTagType,
      themeFilters: store?.themeFilters,
      saveThemeFilters: store?.saveThemeFilters,
    }),
    shallow
  );
  const [loading, setLoading] = useState(false);

  const updateActiveTagType = (tagTypeId) => {
    updateActive(tagTypeId);
  };

  useEffect(() => {
    // get active current tagType
    const tagsToFetch = Object.keys(tagTypes)?.filter(
      (item) => tagTypes[item] && tagTypes[item]?.selected && !tagTypes[item]?.tags?.length
    );

    if (tagsToFetch?.length) {
      setLoading(true);

      const fetchers = tagsToFetch?.map((item) => fetchTagFromType(item));
      Promise.all(fetchers)
        .then((data) => {
          data?.forEach((res, i) => {
            const resData = res.filter(
              (tag) => tag.isActive === true && tag.collageCategory.find((data) => data.name === roomType)
            );

            if (resData?.length > 0) {
              updateTagData(
                tagsToFetch[i],
                res.filter((tag) => tag.isActive === true && tag.collageCategory.find((data) => data.name === roomType))
              );
            } else {
              return;
            }
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tagTypes]);

  useEffect(() => {
    //fetch all tags
    (async () => {
      try {
        setLoading(true);
        const res = await fetcher({
          method: 'GET',
          endPoint: '/v1/tagTypes',
        });
        const { data, statusCode } = res;
        const formattedData = data
          ?.filter(
            (tagType) =>
              // [
              //   'specialty',
              //   'material',
              //   'color',
              //   'shape or form',
              //   'art or rug specific',
              //   'product',
              //   'room size',
              //   'room configurations',
              //   'budget',
              //   'default',
              // ].indexOf(item?.name?.toLowerCase()) === -1
              tagType.isActive === true &&
              tagType.isMandatory === true &&
              tagType.collageCategory.find((data) => data.displayName === roomType)
          )
          .sort((a, b) => (a.name > b.name ? 1 : -1));

        if (statusCode < 300) {
          const tagMap = formattedData.reduce((acc, curr) => {
            acc[curr?._id] = { ...curr, selected: false };

            return acc;
          }, {});
          setTags(tagMap);
        } else {
          throw new Error();
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();

    // support for any tag ID. Add endpoint
  }, []);

  const fetchThemeFilters = async () => {
    const { themes = [] } = themeFilters;
    if (!themes?.length) {
      try {
        setLoading(true);
        const { data, statusCode } = await fetcher({
          endPoint: '/v1/themes/suggestions?isPublic=true',
          method: 'GET',
        });
        if (statusCode < 300) {
          saveThemeFilters(data);
        } else {
          throw new Error();
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    tagTypes,
    updateActiveTagType,
    themeFilters,
    fetchThemeFilters,
  };
};

export default useDesignSetTags;
