import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import {development as config} from './webpack.config';

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  stats: {
    assets: true,
    chunks: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    chunkOrigins: false,
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(9000);
