/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','gheseto.ir'],
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
