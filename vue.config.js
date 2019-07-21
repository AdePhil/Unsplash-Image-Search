module.exports = {
  devServer: {
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: { "^/.netlify/functions": "" }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss"; @import "@/styles/_base.scss";`
      }
    }
  }
};
