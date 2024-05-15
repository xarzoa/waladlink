/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.walad.link',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
