const HomePageBaseSEO = {
  title: 'Spacejoy: #1 store for shopping furniture & decor online',
  description:
    'Discover & personalize curated furniture & decor sets for every style, space and budget. Shop from 500+ brands & furnish any space in minutes - only on Spacejoy',
  additionalMetaTags: '',
  canonical: '',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};
const openGraph = {
  type: 'website',
  locale: 'en_IE',
  url: 'https://www.spacejoy.com/',
};
const additionalLinkTags = [
  {
    key: 'canonical',
    rel: 'canonical',
    href: 'https://www.spacejoy.com',
  },
];
const robotsProps = {
  nosnippet: true,
  notranslate: true,
  noimageindex: true,
  noarchive: true,
  maxSnippet: -1,
  maxImagePreview: 'none',
  maxVideoPreview: -1,
};

const HomeSEO = { ...HomePageBaseSEO, openGraph, additionalLinkTags, robotsProps };

export default { HomeSEO };
