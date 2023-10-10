await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    serverActions: true,
  },
}
export default nextConfig
