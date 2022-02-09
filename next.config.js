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
