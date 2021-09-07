const withPWA = require('next-pwa')


module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    }
    return config
  },
})