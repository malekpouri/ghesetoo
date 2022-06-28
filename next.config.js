/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','gheseto.ir'],
  },
  env: {
    public_url: process.env.NEXT_PUBLIC_API_URL,
    public_api_url:process.env.API_URL
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
