const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '../frontend/src/index.js',
    devServer: {
        contentBase: "../frontend/app/assets/",
        quiet: false,
        noInfo: false,
        publicPath: "/",
        stats: { colors: true }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: require.resolve('eslint-loader'),
                options: {
                    formatter: eslintFormatter,
                    eslintPath: require.resolve('eslint'),
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:8].[ext]',
                        },
                    },
                    {
                        loader: require.resolve('file-loader'),
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            publicPath: '/',
                            name: '[name].[hash:8].[ext]',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: {
            eslint: {
                'extends': 'react-app',
                formatter: eslintFormatter,
                eslintPath: require.resolve('eslint'),
            }
        } }),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'templates/index.html'),
        }),

    ],
    output: {
        filename: 'index.[hash:8].js',
        path: path.resolve(__dirname, 'app/')
    }
};

