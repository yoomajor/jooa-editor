module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/common.scss";
          @import "@/assets/css/base.scss";
        `
      }
    }
  }
}
