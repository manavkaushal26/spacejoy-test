/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const legacyRepo = 'https://designs.spacejoy.com';
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: `${legacyRepo}/pricing`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/customer-stories/:slug*',
        destination: `${legacyRepo}/customer-stories/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/checkout/payment/:slug*',
        destination: `${legacyRepo}/checkout/payment/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/furniture-decor-shop/:slug*',
        destination: `${legacyRepo}/furniture-decor-shop/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },

      {
        source: '/online-room-design',
        destination: `${legacyRepo}/online-room-design`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/online-interior-design',
        destination: `${legacyRepo}/online-interior-design`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/new-project',
        destination: `${legacyRepo}/new-project`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/interior-designs-blog/:slug*',
        destination: `${legacyRepo}/interior-designs-blog/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/spacejoy-vs-modsy',
        destination: `${legacyRepo}/spacejoy-vs-modsy`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/spacejoy-vs-havenly',
        destination: `${legacyRepo}/spacejoy-vs-havenly`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/spacejoy-vs-decorist',
        destination: `${legacyRepo}/spacejoy-vs-decorist`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/spacejoy-vs-others',
        destination: `${legacyRepo}/spacejoy-vs-others`, // Matched parameters can be used in the destination
        permanent: false,
      },

      {
        source: '/dashboard/:slug*',
        destination: `${legacyRepo}/dashboard/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/checkout/design-package',
        destination: `${legacyRepo}/checkout/design-package`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/style-quiz-intro',
        destination: `${legacyRepo}/style-quiz-intro`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/trending-items',
        destination: `${legacyRepo}/trending-items`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/interior-designs/:slug*',
        destination: `${legacyRepo}/interior-designs/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/referrals',
        destination: `${legacyRepo}/referrals`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/balance-check',
        destination: `${legacyRepo}/balance-check`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/profile',
        destination: `${legacyRepo}/profile`, // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/orders/:slug*',
        destination: `${legacyRepo}/orders/:slug*`, // Matched parameters can be used in the destination
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  crossOrigin: 'anonymous',
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'tailwindui.com',
      'storage.googleapis.com',
      'secure.img1-fg.wfcdn.com',
      'i.pinimg.com',
    ],
  },
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    dest: 'public',
    disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
    fallbacks: {
      image: '/images/spj-happy-customer_ahkoxm.jpg',
      // document: '/other-offline',  // if you want to fallback to a custom page other than /_offline
      // font: '/static/font/fallback.woff2',
      // audio: ...,
      // video: ...,
    },
  },
});
