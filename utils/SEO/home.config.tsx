import { company } from "@utils/config";

const HomePageBaseSEO = {
  title: 'Spacejoy: The Best Online Interior Design Service For Your Home',
  description:
    `Design a home you'll love with ${company.product}'s online interior design services. Work 1:1 with top interior designers and transform any space in just 7 days! Get started today.`,
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
