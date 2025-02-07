import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
