/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://blog-auth-api.vercel.app/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
