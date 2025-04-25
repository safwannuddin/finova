/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  webpack: (config, { isServer }) => {
    // Optimize webpack configuration
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    };

    // Handle Edge Runtime issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        setImmediate: false,
        MessageChannel: false,
      };
    }

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
  // Disable Edge Runtime for Clerk components
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-middleware-cache',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;