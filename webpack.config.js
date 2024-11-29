import path from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { glob } from "glob";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === "development";

export default {
  mode: isDevelopment ? "development" : "production",
  entry: {
    background: "./src/background.ts",
    options: "./src/options.ts",
    popup: "./src/popup.ts",
  },
  output: {
    filename: "js/[name].ts.bundle.js",
    path: path.resolve(__dirname, "dist/extension"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "ES2022",
                moduleResolution: "Bundler",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`src/**/*`, { nodir: true }),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/html/*.html",
          to: "[name][ext]",
        },
        {
          from: "icons",
          to: "icons",
        },
        ...(isDevelopment
          ? [
              {
                from: "src/manifest/manifest-chrome.json",
                to: "manifest.json",
              },
            ]
          : []),
      ],
    }),
  ],
};
