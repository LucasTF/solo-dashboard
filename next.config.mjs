/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "server/src/views/out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
