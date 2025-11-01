/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/rupieTimes/',  // 👈 Add your subdirectory name here
  basePath: '/rupieTimes',      // 👈 Important for subfolder routing
};

export default nextConfig;