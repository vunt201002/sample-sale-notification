/* tslint:disable */
const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {WebpackPluginServe} = require('webpack-plugin-serve');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const environmentPath = !process.env.ENVIRONMENT ? '.env' : `.env.${process.env.ENVIRONMENT}`;
const isEmbeddedApp = process.env.IS_EMBEDDED_APP === 'yes';
const indexFile = isEmbeddedApp ? 'embed' : 'standalone';

const [sslKey, sslCert] = ['ssl.key', 'ssl.crt'].map(file => {
  try {
    return fs.readFileSync(path.resolve(__dirname, '../../../ssl/' + file), 'utf8');
  } catch (e) {
    return null;
  }
});
const isHotReloadEnabled = sslKey && sslCert && !isProduction;

const outputPath = path.resolve(__dirname, '../../static');
const outputSuffix = isHotReloadEnabled ? 'hash' : 'contenthash';

const plugins = [
  new HtmlWebpackPlugin({
    filename: `${indexFile}.html`,
    template: path.resolve('webpack/html/index.html'),
    inject: true,
    hash: true,
    meta: {
      'theme-color': '#4285f4',
      description: 'An AVADA Shopify application for Shopify'
    }
  }),
  new Dotenv({
    safe: false,
    defaults: '.env.example',
    systemvars: true,
    path: path.resolve(__dirname, environmentPath)
  }),
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false
  }),
  isProduction &&
    new FaviconsWebpackPlugin({
      logo: path.resolve('webpack/icons/icon.png'),
      favicons: {
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
        }
      }
    }),
  isProduction &&
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
  isProduction &&
    new WebpackPwaManifest({
      filename: 'manifest.json',
      inject: true,
      start_url: '.',
      orientation: 'portrait',
      display: 'standalone',
      fingerprints: true,
      name: 'AVADA',
      short_name: 'avada',
      description: 'An AVADA application for Shopify',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('webpack/icons/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('icons')
        },
        {
          src: path.resolve('webpack/icons/icon-large.png'),
          size: '1024x1024',
          destination: path.join('icons')
        }
      ]
    }),
  isHotReloadEnabled &&
    new WebpackPluginServe({
      // client: {silent: true},
      compress: true,
      historyFallback: true,
      hmr: 'refresh-on-failure',
      // progress: 'minimal',
      host: 'localhost',
      port: 45000 + (isEmbeddedApp ? -5000 : 5000),
      https: {key: sslKey, cert: sslCert},
      static: outputPath,
      status: false
    }),
  isHotReloadEnabled &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wps'
      }
    })
].filter(Boolean);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: [
      path.resolve(__dirname, `src/${indexFile}.js`),
      isHotReloadEnabled && 'webpack-plugin-serve/client'
    ].filter(Boolean)
  },
  output: {
    path: path.resolve(__dirname, '../../static'),
    filename: `${indexFile}/js/[name]~[${outputSuffix}].js`,
    chunkFilename: `${indexFile}/js/[name]~[contenthash].chunk.js`,
    publicPath: '/',
    pathinfo: false
  },
  devtool: isProduction ? false : 'eval-source-map',
  performance: {
    hints: isProduction ? 'warning' : false
  },
  plugins,
  optimization: {
    minimize: isProduction,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [isHotReloadEnabled && 'react-refresh/babel'].filter(Boolean)
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: 'file-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
