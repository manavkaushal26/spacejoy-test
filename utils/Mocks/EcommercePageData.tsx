const cloudinaryImageParams = 'fl_lossy,q_auto/w_450,ar_1:1,c_fill,g_auto';
const Color1 = '#ffeef4';
const Color2 = '#fcf0ee';

export const BrandDeals = [
  {
    id: 1,
    name: 'Wayfair',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-15_ekbwjb.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855514/web/homev3/new-year-sale/New_Year_Sale_-_HP-06-min_mitm50.jpg`,
    discount: {
      start: 40,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 70,
    extraOffer: '',
    color: `${Color1}`,
  },
  {
    id: 2,
    name: 'Pottery Barn',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-22_i29r2s.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855514/web/homev3/new-year-sale/New_Year_Sale_-_HP-07-min_dewlqh.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 40,
    extraOffer: '',
    color: `${Color2}`,
  },
  {
    id: 3,
    name: 'Article',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543284/shared/newBrandLogos/BRAND_LOGOS-08_qeuot6.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-08-min_qsbzbj.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 30,
    extraOffer: '',
    color: `${Color1}`,
  },
  {
    id: 4,
    name: 'Crate And Barrel',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-19_ur2mi1.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855516/web/homev3/new-year-sale/New_Year_Sale_-_HP-09-min_mc8ehe.jpg`,
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 50,
    extraOffer: '',
    color: `${Color2}`,
  },
  {
    id: 5,
    name: 'West Elm',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543286/shared/newBrandLogos/BRAND_LOGOS-23_ffnggf.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-10-min_dozuda.jpg`,
    discount: {
      start: 30,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 50,
    extraOffer: '',
    color: `${Color1}`,
  },
  {
    id: 6,
    name: 'CB2',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-20_xzlagn.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855516/web/homev3/new-year-sale/New_Year_Sale_-_HP-11-min_y1lisn.jpg`,
    shopLink: '',
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 50,
    extraOffer: '',
    color: `${Color2}`,
  },
  {
    id: 7,
    name: 'AllModern',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-16_q36rgq.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-12-min_n6zykx.jpg`,
    shopLink: '',
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 30,
    extraOffer: '',
    color: `${Color1}`,
  },
  {
    id: 8,
    name: 'JoyBird',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1608543285/shared/newBrandLogos/BRAND_LOGOS-21_csf26j.png',
    img: `https://res.cloudinary.com/spacejoy/image/upload/${cloudinaryImageParams}/v1640855515/web/homev3/new-year-sale/New_Year_Sale_-_HP-13-min_vbpktl.jpg`,
    shopLink: '',
    discount: {
      start: 10,
      upto: 100,
    },
    offerPreText: 'UPTO ',
    offer: 30,
    extraOffer: '',
    color: `${Color2}`,
  },
];

export const CategoryData = [
  {
    id: 1,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983857/web/furniture-decor-shop/Black_Friday_Shop_Page-02_hk2xaf.png',
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
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983857/web/furniture-decor-shop/Black_Friday_Shop_Page-03_sxrgg7.png',
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
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-04_ew9uth.png',
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
  {
    id: 4,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-05_liawil.png',
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
  {
    id: 5,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-06_blgt1i.png',
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
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-07_vlskc9.png',
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
  {
    id: 7,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center/v1636983858/web/furniture-decor-shop/Black_Friday_Shop_Page-08_sewed2.png',
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
  {
    id: 8,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-09_smyurz.png',
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
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983867/web/furniture-decor-shop/Black_Friday_Shop_Page-11_wzsywx.png',
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
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983867/web/furniture-decor-shop/Black_Friday_Shop_Page-12_dwlrua.png',
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
  {
    id: 11,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_center/v1636983860/web/furniture-decor-shop/Black_Friday_Shop_Page-13_bfb14l.png',
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
  {
    id: 12,
    imgSrc:
      'fl_lossy,q_auto/w_425,ar_1:1,c_fill,g_auto/v1636983859/web/furniture-decor-shop/Black_Friday_Shop_Page-10_qurdnt.png',
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
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746933/web/offers/memorial-day-sale/brand-logos/Shop%20All%20Things%20Home/BRAND_LOGOS-33_cbklua.png',
  },
  {
    id: 2,
    name: 'Surya',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746935/web/offers/memorial-day-sale/brand-logos/Shop%20Furnishings%20that%20feel%20at%20home/Untitled-6-11_lsmbne.png',
  },
  {
    id: 3,
    name: 'Maiden Home',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746948/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-33_nurbhd.png',
  },
  {
    id: 4,
    name: 'Perigold',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746946/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-35_v1uy2m.png',
  },
  {
    id: 5,
    name: 'Ruggable',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746946/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-6-37_klopiz.png',
  },
  {
    id: 6,
    name: 'Joss & Main',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621754155/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-8-05_jzffgc.png',
  },
  {
    id: 7,
    name: 'Lexmod',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746940/web/offers/memorial-day-sale/brand-logos/Shop%20Furniture%20that%20fits%20your%20style/Untitled-6-01_eiriua.png',
  },
  {
    id: 8,
    name: 'AllModern',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621754155/web/offers/memorial-day-sale/brand-logos/100_%20FREE%20SHIPPING%20%28For%20real%21%29/Untitled-8-07_rzawft.png',
  },
  {
    id: 9,
    name: 'Lamps Plus',
    logo: 'https://res.cloudinary.com/spacejoy/image/upload/ar_16:9,c_fill,g_center/v1621746941/web/offers/memorial-day-sale/brand-logos/Shop%20Decor%20Accessories%2C%20Lighting%20_%20More/Untitled-6-25_ntbkyd.png',
  },
];
