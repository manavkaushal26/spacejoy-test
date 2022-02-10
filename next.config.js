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
        permanent: true,
      },
      {
        source: '/customer-stories',
        destination: `${legacyRepo}/customer-stories`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/customer-stories/:slug',
        destination: `${legacyRepo}/customer-stories/:slug`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/checkout/payment/:slug',
        destination: `${legacyRepo}/checkout/payment/:slug`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/furniture-decor-shop/:slug',
        destination: `${legacyRepo}/furniture-decor-shop/:slug`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/furniture-decor-shop',
        destination: `${legacyRepo}/furniture-decor-shop`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/online-room-design',
        destination: `${legacyRepo}/online-room-design`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/online-interior-design',
        destination: `${legacyRepo}/online-interior-design`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/new-project',
        destination: `${legacyRepo}/new-project`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/interior-designs-blog',
        destination: `${legacyRepo}/interior-designs-blog`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/interior-designs-blog/:slug',
        destination: `${legacyRepo}/interior-designs-blog/:slug`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/spacejoy-vs-modsy',
        destination: `${legacyRepo}/spacejoy-vs-modsy`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/spacejoy-vs-havenly',
        destination: `${legacyRepo}/spacejoy-vs-havenly`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/spacejoy-vs-decorist',
        destination: `${legacyRepo}/spacejoy-vs-decorist`, // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/spacejoy-vs-others',
        destination: `${legacyRepo}/spacejoy-vs-others`, // Matched parameters can be used in the destination
        permanent: true,
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
