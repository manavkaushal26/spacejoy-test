import { XIcon } from '@heroicons/react/outline';
import { NavSelectContext } from '@store/NavSelect';
import { PushEvent } from '@utils/analyticsLogger';
import Image from 'next/image';
import React, { useContext } from 'react';
import { PlaygroundAssetsContext } from 'store/PlaygroundAssets';

export const RoomImageList = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648034023/spj-v2/DIY/room-bg/EW10_tc34ed.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034023/spj-v2/DIY/room-bg/EW10_tc34ed.jpg",
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648034024/spj-v2/DIY/room-bg/EW3_ytx2tk.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034024/spj-v2/DIY/room-bg/EW3_ytx2tk.jpg",
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648034024/spj-v2/DIY/room-bg/EW1_rcocoe.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034024/spj-v2/DIY/room-bg/EW1_rcocoe.jpg",
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589614/spj-v2/DIY/room-bg/final_BR1_ioyrvq.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589614/spj-v2/DIY/room-bg/final_BR1_ioyrvq.jpg",
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589614/spj-v2/DIY/room-bg/Final_BR4_wqo2xq.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589614/spj-v2/DIY/room-bg/Final_BR4_wqo2xq.jpg",
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR6_tiacpn.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR6_tiacpn.jpg",
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR5_fx1qbt.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR5_fx1qbt.jpg",
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR3_qzgn0f.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR3_qzgn0f.jpg",
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR2_jromrv.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR2_jromrv.jpg",
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR8_gdtlsu.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR8_gdtlsu.jpg",
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR9_ubb1k5.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR9_ubb1k5.jpg",
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR10_kdm1zu.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR10_kdm1zu.jpg",
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR7_ykbwg1.jpg',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR7_ykbwg1.jpg",
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png",
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png",
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548470/spj-v2/DIY/room-bg/Room12_aibivq.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548470/spj-v2/DIY/room-bg/Room12_aibivq.png",
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548470/spj-v2/DIY/room-bg/Room8_okmnyt.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548470/spj-v2/DIY/room-bg/Room8_okmnyt.png",
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548470/spj-v2/DIY/room-bg/Room13_arqozg.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548470/spj-v2/DIY/room-bg/Room13_arqozg.png",
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548470/spj-v2/DIY/room-bg/Room11_ctmtgz.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548470/spj-v2/DIY/room-bg/Room11_ctmtgz.png",
  },
  {
    id: 20,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548470/spj-v2/DIY/room-bg/Room16_z7buqz.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548470/spj-v2/DIY/room-bg/Room16_z7buqz.png",
  },
  {
    id: 21,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room10_zriqch.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room10_zriqch.png",
  },
  {
    id: 22,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room18_zdynir.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room18_zdynir.png",
  },
  {
    id: 23,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png",
  },
  {
    id: 24,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room7_axv8dr.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room7_axv8dr.png",
  },
  {
    id: 25,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png",
  },
  {
    id: 26,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room1_amt0gy.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room1_amt0gy.png",
  },
  {
    id: 27,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room4_ppv1sy.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room4_ppv1sy.png",
  },
  {
    id: 28,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room15_ay5boz.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room15_ay5boz.png",
  },
  {
    id: 29,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room2_je5g4d.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room2_je5g4d.png",
  },
  {
    id: 30,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room5_c7lggw.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room5_c7lggw.png",
  },
  {
    id: 31,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648548468/spj-v2/DIY/room-bg/Room6_lmntau.png',
    thumbnailUrl:"https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648548468/spj-v2/DIY/room-bg/Room6_lmntau.png",
  },

];

export interface ColorListType {
  id: number;
  paintDetails: string;
  colorHex: string;
}

export const colorList: ColorListType[] = [
  {
    id: 0,
    paintDetails: 'Ultra White- Benjamin Moore',
    colorHex: '#ECEEEB',
  },
  {
    id: 1,
    paintDetails: 'Repose Gray- Sherwin Williams',
    colorHex: '#CCC8BF',
  },
  {
    id: 2,
    paintDetails: 'Black- Benjamin Moore',
    colorHex: '#323333',
  },
  {
    id: 3,
    paintDetails: 'Extra White- Sherwin Williams',
    colorHex: '#EDEEE9',
  },
  {
    id: 4,
    paintDetails: 'Chelsea Gray- Sherwin Williams',
    colorHex: '#B8B9B3',
  },
  {
    id: 5,
    paintDetails: 'Mindful Gray- Sherwin Williams',
    colorHex: '#BBB6AC',
  },
  {
    id: 6,
    paintDetails: 'Kendall Charcoal- Benjamin Moore',
    colorHex: '#686662',
  },
  {
    id: 7,
    paintDetails: 'Wrought Iron- Benjamin Moore',
    colorHex: '#4A4B4C',
  },
  {
    id: 8,
    paintDetails: 'Sea Salt- Sherwin Williams',
    colorHex: '#CCD1C8',
  },
  {
    id: 9,
    paintDetails: 'Smoke- Benjamin Moore',
    colorHex: '#BBC8C8',
  },
  {
    id: 10,
    paintDetails: 'Beach Glass- Benjamin Moore',
    colorHex: '#B4BDB8',
  },
  {
    id: 11,
    paintDetails: 'Solitude- Benjamin Moore',
    colorHex: '#A3AFB4',
  },
  {
    id: 12,
    paintDetails: 'Boothbay Gray- Benjamin Moore ',
    colorHex: '#ABB2AF',
  },
  {
    id: 13,
    paintDetails: 'Snowbound- Sherwin Williams',
    colorHex: '#EDEAE4',
  },
  {
    id: 14,
    paintDetails: 'Comfort Gray- Sherwin Williams',
    colorHex: '#BBC1B6',
  },
  {
    id: 15,
    paintDetails: 'Waterloo- Sherwin Williams',
    colorHex: '#506570',
  },
  {
    id: 16,
    paintDetails: 'Van Courtland Blue- Benjamin Moore',
    colorHex: '#879A9D',
  },
  {
    id: 17,
    paintDetails: 'Mineral Gray- Sherwin Williams',
    colorHex: '#4F5762',
  },
  {
    id: 18,
    paintDetails: 'Iron Ore- Sherwin Williams',
    colorHex: '#586168',
  },
  {
    id: 19,
    paintDetails: 'Black Magic- Sherwin Williams',
    colorHex: '#302F31',
  },
  {
    id: 20,
    paintDetails: 'Agreeable Gray, Sherwin Williams',
    colorHex: '#D1CAC0',
  },
  {
    id: 21,
    paintDetails: 'Accessible Beige, Sherwin Williams',
    colorHex: '#D1C7B7',
  },
  {
    id: 22,
    paintDetails: 'City Loft, Sherwin Williams',
    colorHex: '#E1DBD1',
  },

  {
    id: 24,
    paintDetails: 'Hunter Green, Benjamin Moore',
    colorHex: '#2C443B',
  },
  {
    id: 25,
    paintDetails: 'Hunter Green, Benjamin Moore',
    colorHex: 'rgba(100, 100, 100, 0)',
  },
  {
    id: 26,
    paintDetails: 'Paint',
    colorHex: '#F2EFED',
  },
];

const BgSelector: React.FC = () => {
  const { bg, activeCollages } = useContext(PlaygroundAssetsContext);
  const { setBgImgUrl } = bg;

  const [, setNav] = useContext(NavSelectContext);

  const setBg = (valueString, type) => {
    setBgImgUrl(valueString, type);
    const name = type === 'bg-img' ? 'room-image' : 'bg-color';
    const activeDesignSets = activeCollages?.length ? activeCollages?.join(',') : 'null';

    PushEvent({
      category: 'Room Background selected',
      action: `Success | Change Background | ${activeDesignSets} | ${name}`,
      label: 'Engage with Design Set',
    });
  };

  return (
    <div className="grid-cols-1 p-4">
      <div className="sticky top-0 z-10 flex justify-between py-2 bg-white">
        <div className="text-xl font-bold">Select background</div>
        <button onClick={() => setNav('')}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div>
        <h2 className="mb-1 font-bold">Rooms</h2>
        <div className="grid grid-cols-3 gap-4 overflow-scroll">
          {RoomImageList.map((img) => {
            return (
              <div
                onClick={() => setBg(img.url, 'bg-img')}
                key={img.id}
                className={`border-2 border-transparent rounded box-border flex-shrink-0 h-24 last:mr-0 relative cursor-pointer overflow-hidden ${
                  bg?.bgImgUrl?.value === img.url && 'border-black'
                }`}
              >
                <Image src={img.thumbnailUrl} layout="fill" alt={img?.url} objectFit="cover" quality={100} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-1 font-normal">Colors</h2>
        <div className="grid grid-cols-4 gap-4 overflow-scroll">
          {colorList.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => setBg(item?.colorHex, 'bg-color')}
                className="box-border relative flex-shrink-0 border border-gray-200 rounded cursor-pointer h-14 last:mr-0"
                style={{ backgroundColor: `${item?.colorHex}` }}
                title={item?.paintDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BgSelector;
