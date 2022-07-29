/* tslint:disable */
const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';
const environmentPath = !process.env.ENVIRONMENT
  ? '.env'
  : `.env.${process.env.ENVIRONMENT}`;

let plugins = [
  new HtmlWebpackPlugin({
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
  })
];

if (isProduction) {
  plugins = [
    ...plugins,
    new CleanWebpackPlugin(),
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
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
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
    })
  ];
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, '../../static'),
    filename: 'js/[name]~[contenthash].js',
    chunkFilename: 'js/[name]~[contenthash].chuck.js',
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
          loader: 'babel-loader'
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
