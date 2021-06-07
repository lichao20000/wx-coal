'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

const  px2rem = require('postcss-plugin-px2rem');
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: function () {
    return [
      require('precss')(),
      px2rem({rootValue:75}),
      require('postcss-cssnext')({
          browsers: ['last 2 versions', '> 5%'],
          warnForDuplicates: false
      })
    ];
  }
}
