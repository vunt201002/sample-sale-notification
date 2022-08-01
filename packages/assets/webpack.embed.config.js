/* tslint:disable */
const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {WebpackPluginServe} = require('webpack-plugin-serve');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const environmentPath = !process.env.ENVIRONMENT ? '.env' : `.env.${process.env.ENVIRONMENT}`;
const outputPath = path.resolve(__dirname, '../../static');
const outputSuffix = isProduction ? 'contenthash' : 'hash';

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'embed.html',
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
  !isProduction &&
    new WebpackPluginServe({
      // client: {silent: true},
      compress: true,
      historyFallback: true,
      hmr: 'refresh-on-failure',
      // progress: 'minimal',
      host: 'localhost',
      port: process.env.WPS_PORT_EM || 45000,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '../../../ssl/ssl.key'), 'utf8'),
        cert: fs.readFileSync(path.resolve(__dirname, '../../../ssl/ssl.crt'), 'utf8')
      },
      static: outputPath,
      status: false
    }),
  !isProduction &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wps'
      }
    })
].filter(Boolean);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: [path.resolve(__dirname, 'src/embed.js'), 'webpack-plugin-serve/client']
  },
  output: {
    path: path.resolve(__dirname, '../../static'),
    filename: `embed/js/[name]~[${outputSuffix}].js`,
    chunkFilename: `embed/js/[name]~[${outputSuffix}].chuck.js`,
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
            plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean)
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
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
