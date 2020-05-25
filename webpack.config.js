const webpack = require('webpack');
const path = require('path');
const fetch = require('node-fetch');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === "production";

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ["babel-polyfill", "./src/index.js", "./src/sass/style.scss"],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: "script.js" 
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/env']
                      }
                    }
                  },
                  {
                      test: /\.scss/,
                      use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                      ]
                  },
                  {
                    test: /\.(png|ico|svg|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '/images/[name].[ext]',
                        }
                      },
                    ]
                  },
                  {
                    test: /\.html$/,
                    loader: 'html-loader',
                  },
                  {
                    test: /\.mp3$/,
                    loader: 'file-loader',
                    options: {
                      name: '/audio/[name].[ext]',
                    }
                },
                {
                  test: /\.json$/,
                  loader: 'json-loader',
                  include: __dirname + '/dist'
                },
                // {
                //   test: /\.js$/,
                //   exclude: /node_modules/,
                //   use: {
                //     loader: 'babel-loader',
                //     options: {
                //       presets: ['env'],
                //     },
                //   },
                // },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(), 
            new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            // new FaviconsWebpackPlugin({
            //     logo: './src/assets/favicon.ico',
            //     publicPath: './'
            // }),
        ]
    }
    return config;
}