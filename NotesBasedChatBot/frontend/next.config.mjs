// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aceternity.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.devfolio.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devfolio.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tietans.tech',
        port: '',
        pathname: '/**',
      },
    ],
  },
}