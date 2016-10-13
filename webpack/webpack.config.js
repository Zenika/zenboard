import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackTargetElectronRenderer from 'webpack-target-electron-renderer'

export const port = 9000;

const commonModules = {
  loaders: [{
    test: /\.jsx?$/,
    loaders: ['babel-loader'],
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]&minimize')
  }, {
    test: /\.png?$/,
    loaders: ['file-loader']
  }, {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=application/font-woff"
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=application/font-woff"
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=application/octet-stream"
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file"
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=image/svg+xml"
  }]
}

const development = {
  entry: [
    `webpack-hot-middleware/client?reload=true&path=http://localhost:${port}/__webpack_hmr`,
    './src/index'
  ],
  module: commonModules,
  output: {
    path:  path.resolve(__dirname, '../dist'),
    publicPath: `http://localhost:${port}/`,
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve(__dirname, '../src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

development.target = webpackTargetElectronRenderer(development);

const production = {
  entry: ['./src/index'],
  module: commonModules,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve(__dirname, '../src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({minimize: true, compress: { warnings: false }}),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
};

production.target = webpackTargetElectronRenderer(production);

export { development, production };
