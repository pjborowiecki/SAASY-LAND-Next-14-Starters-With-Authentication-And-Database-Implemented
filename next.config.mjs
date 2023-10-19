await import("./src/env.mjs")
/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  experimental: { serverActions: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
    domains: ["uploadthing.com"],
  },
}

export default nextConfig
