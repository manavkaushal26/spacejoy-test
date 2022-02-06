import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

const PinterestPanel: React.FC = () => {
  const [pinList, setPinList] = useState([]);

  const getBoardData = async (url: string) => {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setPinList(json.data.pins);
        });
    } catch (error) {}
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.currentTarget?.value)
      getBoardData(`https://api.pinterest.com/v3/pidgets/boards/${e?.currentTarget?.value}/pins/?jsonp`);
  };

  return (
    <>
      <div className="p-4">
        <p className="">Find Your Inspiration</p>
        <small className="text-sm text-gray-500">Choose a Pinterest board that best represents your style.</small>
        <p className="text-sm text-blue-900">Board Ex: spacejoyapp/how-to-style-design-guide</p>
      </div>
      <div className="sticky top-0 z-10 bg-gray-200">
        <div className="relative">
          <input
            onChange={handleChange}
            type="text"
            autoComplete="off"
            placeholder="Public Pinterest Board URL"
            className="text-sm py-3 pr-10 bg-gray-50 outline-none block w-full caret-yellow-500 focus:ring-transparent border-none capitalize"
          />
          <button className="absolute inset-y-0 right-0 px-3">
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="text-right py-1 px-4">
          {pinList.length !== 0 && <span className="text-xs text-gray-600">{pinList.length} results found</span>}
        </div>
      </div>
      {pinList.length !== 0 && (
        <div className="grid grid-cols-2 gap-1 px-1 pb-1">
          {pinList.map((pin) => (
            <div key={pin.id} className="next-image-fix">
              <Image
                src={pin.images['564x'].url}
                alt="pin"
                height={pin.images['564x'].height}
                width={pin.images['564x'].width}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PinterestPanel;
