/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "arogya-ordering.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "arogya-ordering.s3.*",
      },
    ],
  },
};

module.exports = nextConfig;
