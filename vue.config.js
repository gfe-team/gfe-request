const path = require('path')
module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('~', path.resolve('packages'))
  }
}