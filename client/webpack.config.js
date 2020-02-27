const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const api = require('./api/config.json');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  if (config.mode === 'development') {
    config.devServer = {
      proxy: {
        '/api/*': {
          target: api.dev,
          headers: {
            Connection: 'keep-alive',
          },
          secure: false,
          changeOrigin: true,
          logLevel: 'debug',
        },
      },
    };
  }

  return config;
};
