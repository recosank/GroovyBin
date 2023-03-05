/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "i.scdn.co",
      "t.scdn.co",
      "charts-images.scdn.co",
      "mosaic.scdn.co",
      "thisis-images.scdn.co",
    ],
  },
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
