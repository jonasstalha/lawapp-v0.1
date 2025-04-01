const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['react-native-maps']
    }
  }, argv);

  // Add a rule for handling native modules on web
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules[/\\](?!react-native-maps|@react-native)/,
    use: {
      loader: 'babel-loader'
    }
  });

  // Configure MIME types
  config.devServer = {
    ...config.devServer,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/javascript'
    }
  };

  return config;
}; 