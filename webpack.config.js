const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  return {
    mode: "production",
    entry: "./src/vidbg.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "vidbg.js",
      library: "vidbg",
      libraryTarget: "umd",
      libraryExport: "default",
      globalObject: "this",
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
          test: /\.js$/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "src/styles" }],
      }),
    ],
  };
};
