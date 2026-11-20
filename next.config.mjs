let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/room-for-a-thought/index.html',
      headers: [{
        key: 'Content-Security-Policy',
        value: "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' blob:; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
      }, {
        key: 'Referrer-Policy',
        value: 'no-referrer',
      }],
    }]
  },
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: '(?:www\\.)?michellelawson\\.me' }],
      destination: 'https://michellescomputer.com/:path*',
      permanent: true,
    }]
  },
  images: {
    unoptimized: false,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
