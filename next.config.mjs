await import("./src/env.mjs")
/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  experimental: { serverActions: true },
  images: { domains: [] },
}

export default nextConfig
