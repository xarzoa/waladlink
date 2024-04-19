/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ducklabs.xyz',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
