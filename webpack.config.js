import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { glob } from 'glob';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    background: './src/background.ts',
    options: './src/options.ts',
    popup: './src/popup.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/extension'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks(chunk) {
            return chunk.name !== 'background';
          },
          minSize: 0,
        },
        styles: {
          name: 'modern',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: false,
    minimize: !isDevelopment,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: 'ESNext',
                moduleResolution: 'Node',
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
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'modern.css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`src/**/*`, { nodir: true }),
      safelist: {
        standard: [/^toast-/, /^show/, /^icon/, /^lucide/, 'icon', 'icon-wrapper', /data-lucide/],
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/html/*.html',
          to: '[name][ext]',
        },
        {
          from: 'icons',
          to: 'icons',
        },
        {
          from: isDevelopment
            ? 'src/manifest/manifest-chrome.json'
            : 'src/manifest/manifest-chrome.json',
          to: 'manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());
            manifest.content_security_policy = {
              extension_pages: isDevelopment
                ? "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
                : "script-src 'self'; object-src 'self'",
            };
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
  ],
  devtool: isDevelopment ? 'inline-source-map' : false,
};
