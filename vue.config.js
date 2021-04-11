module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Avzag/" : "/",
  productionSourceMap: false,
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.worker\.(c|m)?js$/i,
          use: [
            {
              loader: "worker-loader",
            },
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      ],
    },
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
