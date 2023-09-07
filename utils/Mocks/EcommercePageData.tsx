import { imageKit } from '@utils/config';

const cloudinaryImageParams = 'fl_lossy,q_auto/w_450,ar_1:1,c_fill,g_auto';
const Color1 = '#f9f2e0';
const Color2 = '#baceba';

export const BrandDeals = [
  // /ar_16:9,c_fill,g_center
  {
    id: 1,
    name: 'Wayfair',
    logo: `${imageKit.baseDeliveryUrl}/v1608543285/shared/newBrandLogos/BRAND_LOGOS-15_ekbwjb.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855514/web/homev3/new-year-sale/New_Year_Sale_-_HP-06-min_mitm50.jpg`,
    discount: {
      start: 40,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 40,
    extraOffer: '',
    color: `#F6EEEB`,
  },
  {
    id: 2,
    name: 'Article',
    logo: `${imageKit.baseDeliveryUrl}/v1608543284/shared/newBrandLogos/BRAND_LOGOS-08_qeuot6.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-08-min_qsbzbj.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 20,
    extraOffer: '',
    color: `#E6F4F4`,
  },
  {
    id: 4,
    name: 'Crate And Barrel',
    logo: `${imageKit.baseDeliveryUrl}/v1608543285/shared/newBrandLogos/BRAND_LOGOS-19_ur2mi1.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855516/web/homev3/new-year-sale/New_Year_Sale_-_HP-09-min_mc8ehe.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 30,
    extraOffer: '',
    color: `#DEEFE6`,
  },
  {
    id: 6,
    name: 'CB2',
    logo: `${imageKit.baseDeliveryUrl}/v1608543285/shared/newBrandLogos/BRAND_LOGOS-20_xzlagn.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855516/web/homev3/new-year-sale/New_Year_Sale_-_HP-11-min_y1lisn.jpg`,
    shopLink: '',
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 20,
    extraOffer: '',
    color: `#F7F1E0`,
  },
  {
    id: 5,
    name: 'West Elm',
    logo: `${imageKit.baseDeliveryUrl}/v1608543286/shared/newBrandLogos/BRAND_LOGOS-23_ffnggf.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-10-min_dozuda.jpg`,
    discount: {
      start: 30,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 30,
    extraOffer: '',
    color: `#F7F1E0`,
  },
  {
    id: 2,
    name: 'Pottery Barn',
    logo: `${imageKit.baseDeliveryUrl}/v1608543285/shared/newBrandLogos/BRAND_LOGOS-22_i29r2s.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855514/web/homev3/new-year-sale/New_Year_Sale_-_HP-07-min_dewlqh.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 40,
    extraOffer: '',
    color: `#DEEFE6`,
  },
  {
    id: 7,
    name: 'Ballard Designs',
    logo: `${imageKit.baseDeliveryUrl}/v1646643348/shared/newBrandLogos/Ballard_designs-01_wboray.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-12-min_n6zykx.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 20,
    extraOffer: '',
    color: `#E6F4F4`,
  },
  {
    id: 8,
    name: 'Lexmod',
    logo: `${imageKit.baseDeliveryUrl}/v1608543283/shared/newBrandLogos/BRAND_LOGOS-02_n3b8vy.png`,
    img: `${imageKit.baseDeliveryUrl}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-13-min_vbpktl.jpg`,
    discount: {
      start: 50,
      upto: 100,
    },
    offerPreText: 'Minimum ',
    offer: 50,
    extraOffer: '',
    color: `#F6EEEB`,
  },
];

export const SpacejoyPicksData = [
  {
    id: 1,
    name: 'Surya',
    logo: `${imageKit.baseDeliveryUrl}/v1608543286/shared/newBrandLogos/BRAND_LOGOS-24_g8dq66.png`,
  },
  {
    id: 2,
    name: 'Baxton Studio',
    logo: `${imageKit.baseDeliveryUrl}/v1652240538/shared/newBrandLogos/BrandStoreLogo_Baxton-Studio_1_adhnbv.png`,
  },
  {
    id: 3,
    name: 'Deny Designs',
    logo: `${imageKit.baseDeliveryUrl}/v1608543285/shared/newBrandLogos/BRAND_LOGOS-12_yly871.png`,
  },
  {
    id: 4,
    name: 'TOV',
    logo: `${imageKit.baseDeliveryUrl}/v1623826398/web/offers/summer-refresh-sale/All%20Brand%20Logos/Untitled-3-10_sbqtsq.png`,
  },
  {
    id: 5,
    name: `Moe's Home`,
    logo: `${imageKit.baseDeliveryUrl}/v1608548501/shared/newBrandLogos/BRAND_LOGOS-34_a0a1vj.svg`,
  },
  {
    id: 6,
    name: `ruggable`,
    logo: `${imageKit.baseDeliveryUrl}/v1623826393/web/offers/summer-refresh-sale/All%20Brand%20Logos/Free%20shipping%20on%20your%20favorites/Untitled-3-25_fyydeo.svg`,
  },
  {
    id: 7,
    name: `Shades Of Light`,
    logo: `${imageKit.baseDeliveryUrl}/v1623826399/web/offers/summer-refresh-sale/All%20Brand%20Logos/Untitled-3-20_t5paib.svg`,
  },
  {
    id: 8,
    name: `McGee & Co`,
    logo: `${imageKit.baseDeliveryUrl}/v1623826395/web/offers/summer-refresh-sale/All%20Brand%20Logos/Untitled-3-08_zn1c5t.svg`,
  },
];

export const CategoryData = [
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto
  {
    id: 1,
    imgSrc: '/v1636983857/web/furniture-decor-shop/Black_Friday_Shop_Page-02_hk2xaf.png',
    title: 'Sofas',
    category: 'Furniture',
    subcategory: 'Sofas',
    offerPreText: 'UP TO ',
    offer: '60',
    discount: {
      start: 40,
      upto: 100,
    },
    color: `${Color1}`,
  },
  {
    id: 2,
    imgSrc: '/v1636983857/web/furniture-decor-shop/Black_Friday_Shop_Page-03_sxrgg7.png',
    title: 'Tables',
    category: 'Furniture',
    subcategory: 'Tables',
    offerPreText: 'UP TO ',
    offer: '55',
    discount: {
      start: 50,
      upto: 100,
    },
    color: `${Color2}`,
  },
  {
    id: 3,
    imgSrc: '/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-04_ew9uth.png',
    title: 'Chairs',
    category: 'Furniture',
    subcategory: 'Chairs',
    offerPreText: 'UP TO ',
    offer: '70',
    discount: {
      start: 55,
      upto: 100,
    },
    color: `${Color1}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center
  {
    id: 4,
    imgSrc: '/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-05_liawil.png',
    title: 'Lighting',
    category: 'Lighting',
    offerPreText: 'UP TO ',
    offer: '50',
    discount: {
      start: 10,
      upto: 100,
    },
    color: `${Color2}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto
  {
    id: 5,
    imgSrc: '/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-06_blgt1i.png',
    title: 'Mirrors',
    category: 'Decor',
    subcategory: 'Mirrors',
    offerPreText: 'UP TO ',
    offer: '40',
    discount: {
      start: 30,
      upto: 100,
    },
    color: `${Color2}`,
  },
  {
    id: 6,
    imgSrc: '/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-07_vlskc9.png',
    title: 'Rugs',
    category: 'Furnishings',
    subcategory: 'Rugs',
    offerPreText: 'MIN ',
    offer: '60',
    discount: {
      start: 60,
      upto: 100,
    },
    color: `${Color1}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center
  {
    id: 7,
    imgSrc: '/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-08_sewed2.png',
    title: 'Wall Art',
    category: 'Decor',
    subcategory: 'Wall Decor',
    vertical: 'Wall Art',
    offerPreText: 'UP TO ',
    offer: '65',
    discount: {
      start: 55,
      upto: 100,
    },
    color: `${Color2}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto
  {
    id: 8,
    imgSrc: '/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-09_smyurz.png',
    title: 'Plants & Planters',
    category: 'Plants & Planters',
    subcategory: 'Plants',
    offerPreText: 'UP TO ',
    offer: '30',
    discount: {
      start: 20,
      upto: 100,
    },
    color: `${Color1}`,
  },
  {
    id: 9,
    imgSrc: '/v1636983867/web/furniture-decor-shop/Black_Friday_Shop_Page-11_wzsywx.png',
    title: 'Storage & Organizers',
    category: 'Furniture',
    subcategory: 'Storage & Organizers',
    offerPreText: 'UP TO ',
    offer: '40',
    discount: {
      start: 10,
      upto: 100,
    },
    color: `${Color1}`,
  },
  {
    id: 10,
    imgSrc: '/v1636983867/web/furniture-decor-shop/Black_Friday_Shop_Page-12_dwlrua.png',
    title: 'Bedding',
    category: 'Furnishings',
    subcategory: 'Bedding',
    offerPreText: 'MIN ',
    offer: '60',
    discount: {
      start: 60,
      upto: 100,
    },
    color: `${Color2}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center
  {
    id: 11,
    imgSrc: '/v1636983860/web/furniture-decor-shop/Black_Friday_Shop_Page-13_bfb14l.png',
    title: 'Curtains & Decor',
    category: 'Furnishings',
    subcategory: 'Window Treatments',
    vertical: 'Curtains & Drapes',
    offerPreText: 'UP TO ',
    offer: '60',
    discount: {
      start: 40,
      upto: 100,
    },
    color: `${Color1}`,
  },
  // fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto
  {
    id: 12,
    imgSrc: '/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-10_qurdnt.png',
    title: 'Pillows & Covers',
    category: 'Furnishings',
    subcategory: 'Decorative Pillows & Covers',
    offerPreText: 'MIN ',
    offer: '50',
    discount: {
      start: 50,
      upto: 100,
    },
    color: `${Color2}`,
  },
];

export const BrandPartners = [
  {
    id: 1,
    name: 'Wayfair',
    logo: '/v1621746933/web/offers/memorial-day-sale/brand-logos/Shop%20All%20Things%20Home/BRAND_LOGOS-33_cbklua.png',
    href: 'https://www.spacejoy.com/shop?retailer=Wayfair',
  },
  {
    id: 2,
    name: 'Surya',
    logo: '/v1621746935/web/offers/memorial-day-sale/brand-logos/Shop%20Furnishings%20that%20feel%20at%20home/Untitled-6-11_lsmbne.png',
    href: 'https://www.spacejoy.com/shop?retailer=Surya',
  },
  {
    id: 3,
    name: 'Maiden Home',
    logo: '/v1621746948/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-33_nurbhd.png',
    href: 'https://www.spacejoy.com/shop?retailer=Maiden+Home',
  },
  {
    id: 4,
    name: 'Perigold',
    logo: '/v1621746946/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-35_v1uy2m.png',
    href: 'https://www.spacejoy.com/shop?retailer=Perigold',
  },
  {
    id: 5,
    name: 'Ruggable',
    logo: '/v1621746946/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-37_klopiz.png',
    href: 'https://www.spacejoy.com/shop?retailer=ruggable',
  },
  {
    id: 6,
    name: 'Joss & Main',
    logo: '/v1621754155/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-8-05_jzffgc.png',
    href: 'https://www.spacejoy.com/shop?retailer=Joss+And+Main',
  },
  {
    id: 7,
    name: 'Lexmod',
    logo: '/v1621746940/web/offers/memorial-day-sale/brand-logos/Shop%20Furniture%20that%20fits%20your%20style/Untitled-6-01_eiriua.png',
    href: 'https://www.spacejoy.com/shop?retailer=Lexmod',
  },
  {
    id: 8,
    name: 'AllModern',
    logo: '/v1621754155/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-8-07_rzawft.png',
    href: 'https://www.spacejoy.com/shop?retailer=AllModern',
  },
  {
    id: 9,
    name: 'Lamps Plus',
    logo: '/v1621746941/web/offers/memorial-day-sale/brand-logos/Shop%20Decor%20Accessories%2C%20Lighting%20_%20More/Untitled-6-25_ntbkyd.png',
    href: 'https://www.spacejoy.com/shop?retailer=Lamps+Plus',
  },
];
