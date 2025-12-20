/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Or specific host like "res.cloudinary.com"
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
