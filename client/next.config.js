/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
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
