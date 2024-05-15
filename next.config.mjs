/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "server/out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
