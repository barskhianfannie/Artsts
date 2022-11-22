/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
    // For cloudflare pages with Next.js  https://nextjs.org/docs/advanced-features/react-18/switchable-runtime
    experimental: {
      runtime: 'experimental-edge', // 'node.js' (default) | experimental-edge
    },
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'x-dune-api-key',
            value: 'wkQCNz0jbNLfOUisFMVhfDLu6gSpXrD4',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig
