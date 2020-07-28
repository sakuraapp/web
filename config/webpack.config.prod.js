const TerserPlugin = require('terser-webpack-plugin');

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge.smart(baseConfig, {
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin() ],
    },
})
