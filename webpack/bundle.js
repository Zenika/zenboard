import webpack from 'webpack'

import {production as config} from './webpack.config'

const compiler = webpack(config)

compiler.run(function(err, stats) {

  if (err) { throw console.console.error(err) }  // eslint-disable-line no-console

  console.log('[webpack:build]', stats.toString({  // eslint-disable-line no-console
      chunks: false,
      colors: true
  }));

});
