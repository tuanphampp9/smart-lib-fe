import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      quill$: 'quill/dist/quill.js',
    }
    return config
  },
}

export default nextConfig
