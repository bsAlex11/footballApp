const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const packageJson = require('./package.json');

const mode = process.env.NODE_ENV.trim() === 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  devtool: 'source-map',
  entry: './src/index.tsx',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    contentBase: './dist',
    port: 8081,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist'),
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            }
          },
          'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                ],
              }
            },
          },
          'sass-loader',
        ]
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader' 
      },
      {
        test: /\.png|jpe?g|gif|svg$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new Dotenv({
      path: './.env.development'
    }),
    new ModuleFederationPlugin({
      name: 'gameFinder',
      filename: 'remoteEntry.js',
      exposes: {
        './GameFinderApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
  ]
};
