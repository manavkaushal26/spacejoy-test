import { XIcon } from '@heroicons/react/outline';
import { NavSelectContext } from '@store/NavSelect';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import React, { useContext } from 'react';
import { PlaygroundAssetsContext } from 'store/PlaygroundAssets';

export const RoomImageList = [
  //ENTRYWAY
  {
    id: 1,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_7_sknyh0.jpg',
  },
  {
    id: 2,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_8_mnjy6l.jpg',
  },
  {
    id: 3,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_9_vcy0yo.jpg',
  },
  {
    id: 4,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_5_krv0sg.jpg',
  },
  {
    id: 5,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_3_oogqev.jpg',
  },
  {
    id: 6,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_6_helh6z.jpg',
  },
  {
    id: 7,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_2_o8ixkd.jpg',
  },
  {
    id: 8,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_1_pflmpl.jpg',
  },
  {
    id: 9,
    url: 'v1649398381/spj-v2/DIY/room-bg/Entryway/EN_10_iawjss.jpg',
  },
  //LIVING ROOMS
  {
    id: 1,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png',
  },
  {
    id: 2,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png',
  },
  {
    id: 3,
    url: 'v1648548470/spj-v2/DIY/room-bg/Room12_aibivq.png',
  },
  {
    id: 4,
    url: 'v1648548470/spj-v2/DIY/room-bg/Room8_okmnyt.png',
  },
  {
    id: 5,
    url: 'v1648548470/spj-v2/DIY/room-bg/Room13_arqozg.png',
  },
  {
    id: 6,
    url: 'v1648548470/spj-v2/DIY/room-bg/Room11_ctmtgz.png',
  },
  {
    id: 7,
    url: 'v1648548470/spj-v2/DIY/room-bg/Room16_z7buqz.png',
  },
  {
    id: 8,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room10_zriqch.png',
  },
  {
    id: 9,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room18_zdynir.png',
  },
  {
    id: 10,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room9_bnln6g.png',
  },
  {
    id: 11,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room7_axv8dr.png',
  },
  {
    id: 12,
    url: 'v1648548469/spj-v2/DIY/room-bg/Room17_avlidb.png',
  },
  {
    id: 13,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room1_amt0gy.png',
  },
  {
    id: 14,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room4_ppv1sy.png',
  },
  {
    id: 15,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room15_ay5boz.png',
  },
  {
    id: 16,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room2_je5g4d.png',
  },
  {
    id: 17,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room5_c7lggw.png',
  },
  {
    id: 18,
    url: 'v1648548468/spj-v2/DIY/room-bg/Room6_lmntau.png',
  },
  {
    id: 19,
    url: 'v1649067740/spj-v2/DIY/room-bg/2022-new-room-templates/living-room/Layout_3_LR_final_qqnpzu.jpg',
  },
  {
    id: 20,
    url: 'v1649067740/spj-v2/DIY/room-bg/2022-new-room-templates/living-room/Layout_4_LR_final_vqd8ri.jpg',
  },
  {
    id: 21,
    url: 'v1649067740/spj-v2/DIY/room-bg/2022-new-room-templates/living-room/Layout_1_LR_final_zo3uzl.jpg',
  },
  {
    id: 22,
    url: 'v1649067740/spj-v2/DIY/room-bg/2022-new-room-templates/living-room/Layout_2_LR_final_o9nwla.jpg',
  },
  {
    id: 23,
    url: 'v1649768393/spj-v2/DIY/room-bg/Layout_1_LR_final_2_wpofxr.png',
  },
  //BEDROOMS
  {
    id: 1,
    url: 'v1649063366/spj-v2/DIY/room-bg/Bedroom/BR_5_s0lvee.jpg',
  },
  {
    id: 2,
    url: 'v1649063365/spj-v2/DIY/room-bg/Bedroom/BR_8_y05co1.jpg',
  },
  {
    id: 3,
    url: 'v1649063365/spj-v2/DIY/room-bg/Bedroom/BR_9_cibscy.jpg',
  },
  {
    id: 4,
    url: 'v1649063365/spj-v2/DIY/room-bg/Bedroom/BR_7_nf3kdq.jpg',
  },
  {
    id: 5,
    url: 'v1649063365/spj-v2/DIY/room-bg/Bedroom/BR_6_vu7rqo.jpg',
  },
  {
    id: 6,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_4_tklyih.jpg',
  },
  {
    id: 7,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_3_mplqcx.jpg',
  },
  {
    id: 8,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_21_rico80.jpg',
  },
  {
    id: 9,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_20_ummpaz.jpg',
  },
  {
    id: 10,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_12_lxzcdo.jpg',
  },
  {
    id: 11,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_2_yrljiw.jpg',
  },
  {
    id: 12,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_19_b0fb5x.jpg',
  },
  {
    id: 13,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_18_limsdq.jpg',
  },
  {
    id: 14,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_17_minm8r.jpg',
  },
  {
    id: 15,
    url: 'v1649063364/spj-v2/DIY/room-bg/Bedroom/BR_16_wntj5a.jpg',
  },
  {
    id: 16,
    url: 'v1649063363/spj-v2/DIY/room-bg/Bedroom/BR_13_bdhvr6.jpg',
  },
  {
    id: 17,
    url: 'v1649063363/spj-v2/DIY/room-bg/Bedroom/BR_14_hxw3uk.jpg',
  },
  {
    id: 18,
    url: 'v1649063363/spj-v2/DIY/room-bg/Bedroom/BR_15_vpyk7n.jpg',
  },
  {
    id: 19,
    url: 'v1649063363/spj-v2/DIY/room-bg/Bedroom/BR_10_qht1tc.jpg',
  },
  {
    id: 20,
    url: 'v1649063363/spj-v2/DIY/room-bg/Bedroom/BR_1_bqkmvi.jpg',
  },
  {
    id: 21,
    url: 'v1649067743/spj-v2/DIY/room-bg/2022-new-room-templates/bedroom/Layout_2_BR_Final_ebdlt9.png',
  },
  {
    id: 22,
    url: 'v1649067742/spj-v2/DIY/room-bg/2022-new-room-templates/bedroom/Layout_1_BR_Final_ita0qt.png',
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
          {RoomImageList.map((img, idx) => {
            return (
              <div
                onClick={() => setBg(`${imageKit.baseDeliveryUrl}/${img?.url}`, 'bg-img')}
                key={idx}
                className={`border-2 border-transparent rounded box-border flex-shrink-0 h-24 last:mr-0 relative cursor-pointer overflow-hidden ${
                  bg?.bgImgUrl?.value === `${imageKit.baseDeliveryUrl}/${img?.url}` && 'border-black'
                }`}
              >
                <Image
                  src={`${imageKit.baseDeliveryUrl}/w_400,f_auto,q_auto/${img.url}`}
                  layout="fill"
                  alt={`${imageKit.baseDeliveryUrl}/${img?.url}`}
                  objectFit="cover"
                  quality={100}
                />
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
