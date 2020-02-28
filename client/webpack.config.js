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
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view)/,
      use: {
        loader: 'babel-loader',
        options: {
          // Disable reading babel configuration
          babelrc: false,
          configFile: false,

          // The configuration for compilation
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'usage' }],
            '@babel/preset-react',
            '@babel/preset-flow',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
          ],
        },
      },
    });
  }

  return config;
};
