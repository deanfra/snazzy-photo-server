const path = require('path')
const CONTEXT_PATH = path.resolve('.')
const DIST_PATH = `${CONTEXT_PATH}/../static`
const SRC_PATH = `${CONTEXT_PATH}/src`
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: NODE_ENV,
  devtool: 'eval-source-map', // Enable sourcemaps for debugging webpack's output.
  entry: `${SRC_PATH}/index.tsx`,
  context: CONTEXT_PATH, // ForkTsCheckerWebpackPlugin to automatically find tsconfig.json
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components/'), // synced with tsconfig paths
      interfaces: path.resolve(__dirname, '../src/interfaces/'), // synced with tsconfig paths
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'app-[hash].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/public/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(css)$/,
        include: /(node_modules\/normalize.css|src\/public\/base.css)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
}
