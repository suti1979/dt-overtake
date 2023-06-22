/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "backend", "127.0.0.1"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/drivers",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
