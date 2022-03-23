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
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034023/spj-v2/DIY/room-bg/EW10_tc34ed.jpg',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648034024/spj-v2/DIY/room-bg/EW3_ytx2tk.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034024/spj-v2/DIY/room-bg/EW3_ytx2tk.jpg',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1648034024/spj-v2/DIY/room-bg/EW1_rcocoe.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1648034024/spj-v2/DIY/room-bg/EW1_rcocoe.jpg',
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR6_tiacpn.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR6_tiacpn.jpg',
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR5_fx1qbt.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR5_fx1qbt.jpg',
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR3_qzgn0f.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR3_qzgn0f.jpg',
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR2_jromrv.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR2_jromrv.jpg',
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR8_gdtlsu.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR8_gdtlsu.jpg',
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR9_ubb1k5.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR9_ubb1k5.jpg',
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR12_axaldt.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR12_axaldt.jpg',
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR10_kdm1zu.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR10_kdm1zu.jpg',
  },
  {
    id: 20,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR13_bkhe4z.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR13_bkhe4z.jpg',
  },
  {
    id: 21,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR15_zbtfog.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR15_zbtfog.jpg',
  },
  {
    id: 22,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589616/spj-v2/DIY/room-bg/Final_BR19_x7dq4m.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589616/spj-v2/DIY/room-bg/Final_BR19_x7dq4m.jpg',
  },
  {
    id: 23,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589615/spj-v2/DIY/room-bg/Final_BR7_ykbwg1.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589615/spj-v2/DIY/room-bg/Final_BR7_ykbwg1.jpg',
  },
  // {
  //   id: 0,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927145/spj-v2/DIY/room-bg/11J_hj8m54.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927145/spj-v2/DIY/room-bg/11J_hj8m54.jpg',
  // },
  // {
  //   id: 1,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927146/spj-v2/DIY/room-bg/17J_ryibcx.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927146/spj-v2/DIY/room-bg/17J_ryibcx.jpg',
  // },
  // {
  //   id: 2,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927146/spj-v2/DIY/room-bg/12J_be2d2i.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927146/spj-v2/DIY/room-bg/12J_be2d2i.jpg',
  // },
  // {
  //   id: 3,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927147/spj-v2/DIY/room-bg/15J_rbtl5w.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927147/spj-v2/DIY/room-bg/15J_rbtl5w.jpg',
  // },
  // {
  //   id: 4,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927147/spj-v2/DIY/room-bg/14J_tdwftl.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927147/spj-v2/DIY/room-bg/14J_tdwftl.jpg',
  // },
  // {
  //   id: 5,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927147/spj-v2/DIY/room-bg/16J_uk0pug.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927147/spj-v2/DIY/room-bg/16J_uk0pug.jpg',
  // },
  // {
  //   id: 6,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927147/spj-v2/DIY/room-bg/13J_pqvpup.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927147/spj-v2/DIY/room-bg/13J_pqvpup.jpg',
  // },
  // {
  //   id: 7,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927148/spj-v2/DIY/room-bg/18J_o7sz2c.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927148/spj-v2/DIY/room-bg/18J_o7sz2c.jpg',
  // },
  // {
  //   id: 8,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927148/spj-v2/DIY/room-bg/20J_ukeb7j.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927148/spj-v2/DIY/room-bg/20J_ukeb7j.jpg',
  // },
  // {
  //   id: 9,
  //   url: 'https://res.cloudinary.com/spacejoy/image/upload/v1632927147/spj-v2/DIY/room-bg/19J_ihemhw.jpg',
  //   thumbnailUrl:
  //     'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1632927147/spj-v2/DIY/room-bg/19J_ihemhw.jpg',
  // },
  {
    id: 10,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589614/spj-v2/DIY/room-bg/final_BR1_ioyrvq.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589614/spj-v2/DIY/room-bg/final_BR1_ioyrvq.jpg',
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589614/spj-v2/DIY/room-bg/Final_BR4_wqo2xq.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1633589614/spj-v2/DIY/room-bg/Final_BR4_wqo2xq.jpg',
  },

  {
    id: 30,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892052/spj-v2/DIY/room-bg/F_LR_14_lnbhrs.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892052/spj-v2/DIY/room-bg/F_LR_14_lnbhrs.jpg',
  },
  {
    id: 31,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892052/spj-v2/DIY/room-bg/F_LR_17_po8q4k.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892052/spj-v2/DIY/room-bg/F_LR_17_po8q4k.jpg',
  },
  {
    id: 32,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892052/spj-v2/DIY/room-bg/F_LR_18_g806vu.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892052/spj-v2/DIY/room-bg/F_LR_18_g806vu.jpg',
  },
  {
    id: 33,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892052/spj-v2/DIY/room-bg/F_LR_16_bu7tv6.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892052/spj-v2/DIY/room-bg/F_LR_16_bu7tv6.jpg',
  },
  {
    id: 34,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_13_xbsdko.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_13_xbsdko.jpg',
  },
  {
    id: 35,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_6_wjvnjw.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_6_wjvnjw.jpg',
  },
  {
    id: 36,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_15_stvwpk.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_15_stvwpk.jpg',
  },
  {
    id: 37,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_9_jqk33k.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_9_jqk33k.jpg',
  },
  {
    id: 38,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_12_scquyk.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_12_scquyk.jpg',
  },
  {
    id: 39,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892051/spj-v2/DIY/room-bg/F_LR_11_gv53fd.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892051/spj-v2/DIY/room-bg/F_LR_11_gv53fd.jpg',
  },
  {
    id: 40,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_10_aviacx.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_10_aviacx.jpg',
  },
  {
    id: 41,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_7_f8jtq4.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_7_f8jtq4.jpg',
  },
  {
    id: 42,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_8_jl49uk.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_8_jl49uk.jpg',
  },
  {
    id: 43,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_2_ftd5pn.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_2_ftd5pn.jpg',
  },
  {
    id: 44,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_5_smmb4g.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_5_smmb4g.jpg',
  },
  {
    id: 45,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892049/spj-v2/DIY/room-bg/F_LR_4_zqxyei.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892049/spj-v2/DIY/room-bg/F_LR_4_zqxyei.jpg',
  },
  {
    id: 46,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892050/spj-v2/DIY/room-bg/F_LR_3_kimemg.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892050/spj-v2/DIY/room-bg/F_LR_3_kimemg.jpg',
  },
  {
    id: 47,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892049/spj-v2/DIY/room-bg/F_BR21_nzg1r0.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892049/spj-v2/DIY/room-bg/F_BR21_nzg1r0.jpg',
  },
  {
    id: 48,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892049/spj-v2/DIY/room-bg/F_LR_1_clybmf.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892049/spj-v2/DIY/room-bg/F_LR_1_clybmf.jpg',
  },
  {
    id: 49,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892049/spj-v2/DIY/room-bg/F_BR14_yd55sk.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892049/spj-v2/DIY/room-bg/F_BR14_yd55sk.jpg',
  },
  {
    id: 50,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1634892048/spj-v2/DIY/room-bg/F_BR16_ibatbb.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1634892048/spj-v2/DIY/room-bg/F_BR16_ibatbb.jpg',
  },
  {
    id: 51,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856123/web/Canvas/RoomBg/Template_7_v2_e122ro.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856123/web/Canvas/RoomBg/Template_7_v2_e122ro.jpg',
  },
  {
    id: 52,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856124/web/Canvas/RoomBg/Template_8_v2_nmb3j5.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856124/web/Canvas/RoomBg/Template_8_v2_nmb3j5.jpg',
  },
  {
    id: 53,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856124/web/Canvas/RoomBg/Template_12_v2_sb4z5j.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856124/web/Canvas/RoomBg/Template_12_v2_sb4z5j.jpg',
  },
  {
    id: 54,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856123/web/Canvas/RoomBg/Template_10_v2_sig0w9.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856123/web/Canvas/RoomBg/Template_10_v2_sig0w9.jpg',
  },
  {
    id: 55,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856124/web/Canvas/RoomBg/Template_11_v2_e1osvt.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856124/web/Canvas/RoomBg/Template_11_v2_e1osvt.jpg',
  },
  {
    id: 56,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856123/web/Canvas/RoomBg/Template_9_v2_qbv78a.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856123/web/Canvas/RoomBg/Template_9_v2_qbv78a.jpg',
  },
  {
    id: 57,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856123/web/Canvas/RoomBg/Template_6_v2_ufmji2.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856123/web/Canvas/RoomBg/Template_6_v2_ufmji2.jpg',
  },
  {
    id: 58,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_2_v2_ddhsrs.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_2_v2_ddhsrs.jpg',
  },
  {
    id: 59,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_3_v2_fdqfk7.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_3_v2_fdqfk7.jpg',
  },
  {
    id: 60,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_15_v2_jbhc8p.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_15_v2_jbhc8p.jpg',
  },
  {
    id: 61,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_1_v2_h5tnap.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_1_v2_h5tnap.jpg',
  },
  {
    id: 62,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_4_v2_yhkyp6.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_4_v2_yhkyp6.jpg',
  },
  {
    id: 63,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856121/web/Canvas/RoomBg/Template_5_v2_pxa1ed.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856121/web/Canvas/RoomBg/Template_5_v2_pxa1ed.jpg',
  },
  {
    id: 64,
    url: 'https://res.cloudinary.com/spacejoy/image/upload/v1647856124/web/Canvas/RoomBg/Template_14_v2_kthr1k.jpg',
    thumbnailUrl:
      'https://res.cloudinary.com/spacejoy/image/upload/w_400,f_auto,q_auto/v1647856124/web/Canvas/RoomBg/Template_14_v2_kthr1k.jpg',
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
