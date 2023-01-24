/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://accounts.spotify.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
