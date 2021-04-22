module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/avzag/" : "/",
  productionSourceMap: false,
  chainWebpack: (config) =>
    config.module
      .rule("web-worker")
      .test("/.worker.(c|m)?js$/i")
      .use("worker")
      .loader("worker-loader")
      .end()
      .use("babel")
      .loader("babel-loader")
      .options({
        presets: ["@babel/preset-env"],
      })
      .end(),
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/scss/_variables.scss";',
      },
    },
  },
  pwa: {
    name: "Avzag",
    themeColor: "#4A4A4A",
    appleMobileWebAppCapable: "yes",
    manifestOptions: {
      icons: [
        {
          src: "icon.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
    },
    iconPaths: {
      favicon32: "icon.png",
      favicon16: "icon.png",
      appleTouchIcon: "icon.png",
      maskIcon: "icon.png",
      msTileImage: "icon.png",
    },
  },
};
