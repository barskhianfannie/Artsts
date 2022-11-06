/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
