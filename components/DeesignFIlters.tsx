import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import useDesignSetTags from '@hooks/useDesignSetTags';
import React from 'react';

const DesignFilter = ({ updateTags, tagFilters, appliedThemeFilters }) => {
  const { tagTypes, loading, updateActiveTagType, themeFilters, fetchThemeFilters } = useDesignSetTags('');

  const { themes = [] } = themeFilters;

  return (
    <div className="design-filter">
      <div className="mb-4">
        <h3 className="text-gray-700">Filters</h3>
      </div>
      {
        <Disclosure>
          {({ open }) => {
            return (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full py-2  text-left rounded-sm">
                  <div
                    className="flex items-center justify-between w-full py-2  text-left rounded-sm border-b border-gray-300 text-sm"
                    onClick={fetchThemeFilters}
                  >
                    <span className="text-gray-700 capitalize">Design Styles</span>
                    <span className="flex items-center ml-6">
                      {open ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
                    </span>
                  </div>
                </Disclosure.Button>

                <Disclosure.Panel>
                  {open ? (
                    <>
                      {loading ? (
                        <>
                          {[...new Array(10)]?.map((_d, _i) => {
                            return (
                              <li className="flex py-2 sm:py-2  animate-pulse" key={`filter-dimmer${_i}`}>
                                <div className="w-1/6 bg-gray-200  rounded-md" />
                                <div className="ml-1 flex-1 flex flex-col justify-between sm:ml-1">
                                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0" />
                                  <div className=" h-5 bg-gray-200 rounded-md" />
                                </div>
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {themes?.map((item) => {
                            return (
                              <>
                                <div
                                  className=" cursor-pointer py-2 relative flex"
                                  key={item?._id}
                                  onClick={() => updateTags(item?.name, 'theme')}
                                >
                                  <div className="absolute inset-0 bg-transparent flex items-center" />
                                  <input
                                    id={`filter-category-${item?._id}`}
                                    name={`filter-category-${item?.name}`}
                                    value={item?.name}
                                    type="checkbox"
                                    className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                    checked={appliedThemeFilters?.indexOf(item?.name?.toLowerCase()) > -1}
                                    // disabled
                                    readOnly
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <label
                                    htmlFor={`filter-category-${item?._id}`}
                                    className="ml-3 text-sm text-gray-900 cursor-pointer capitalize"
                                  >
                                    {item?.name}
                                  </label>
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                    </>
                  ) : null}
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      }
      {Object.keys(tagTypes)?.map((tag) => {
        const tagObject = tagTypes[tag];

        return (
          <Disclosure key={tagObject?._id}>
            {({ open }) => {
              return (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full py-2  text-left rounded-sm">
                    <div
                      className="flex items-center justify-between w-full py-2  text-left rounded-sm border-b border-gray-300 text-sm"
                      onClick={() => updateActiveTagType(tagObject?._id)}
                    >
                      <span className="text-gray-700 capitalize">{tagObject?.name}</span>
                      <span className="flex items-center ml-6">
                        {open ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
                      </span>
                    </div>
                  </Disclosure.Button>

                  <Disclosure.Panel>
                    {open ? (
                      <>
                        {loading ? (
                          <>
                            {[...new Array(10)]?.map((_d, _i) => {
                              return (
                                <li className="flex py-2 sm:py-2  animate-pulse" key={`filter-dimmer${_i}`}>
                                  <div className="w-1/6 bg-gray-200  rounded-md" />
                                  <div className="ml-1 flex-1 flex flex-col justify-between sm:ml-1">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0" />
                                    <div className=" h-5 bg-gray-200 rounded-md" />
                                  </div>
                                </li>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {tagObject?.tags?.map((item) => {
                              return (
                                <>
                                  <div
                                    className=" cursor-pointer py-2 relative flex"
                                    key={item?._id}
                                    onClick={(e) => {
                                      // e.preventDefault();
                                      updateTags(item?.name, 'tag');
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-transparent flex items-center" />
                                    <input
                                      id={`filter-category-${item?._id}`}
                                      name={`filter-category-${item?.name}`}
                                      value={item?.name}
                                      type="checkbox"
                                      className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                      checked={tagFilters?.indexOf(item?.name?.toLowerCase()) > -1}
                                      // disabled
                                      readOnly
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <label
                                      htmlFor={`filter-category-${item?._id}`}
                                      className="ml-3 text-sm text-gray-900 cursor-pointer capitalize"
                                    >
                                      {item?.name}
                                    </label>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    ) : null}
                  </Disclosure.Panel>
                </>
              );
            }}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default React.memo(DesignFilter);
