var webpack = require('webpack');
var path = require('path');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const debug = (process.env.NODE_ENV || '').trim() !== 'production';
const deploy = process.env.NODE_DEPLOY !== undefined;

console.log('#####################');
console.log('debug mode: ', debug);
console.log('deploy mode: ', deploy);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.env.NODE_DEPLOY: ', process.env.NODE_DEPLOY);
console.log('#####################');

var config = {
    mode: debug ? 'development' : 'production',
    context: __dirname,
    devtool: 'source-map',
    entry: { app: './src/js/App.jsx' },
    optimization: {
        splitChunks: {
            cacheGroups: {
                app: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, deploy || !debug ? 'dist' : 'src'),
        filename: debug ? '[name].[hash].js' : '[name].[chunkhash].js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.html', '.scss', '.less', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src/js'),
            '#': path.resolve(__dirname, 'src'),
            config: path.resolve(__dirname, 'src/config.js'),
            root: path.resolve(__dirname)
        }
    },
    externals: {
        config: 'config'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions']
                                },
                                loose: true,
                                modules: false,
                                useBuiltIns: true,
                                debug: false
                            }
                        ],
                        'react',
                        'stage-3'
                    ],
                    plugins: [
                        'transform-runtime',
                        'react-html-attrs',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ].concat(debug ? [] : ['transform-react-inline-elements'])
                },
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1, sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: debug,
                            plugins: [require('autoprefixer')()]
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|jpe?g|png|otf|ico|eot|svg|woff|woff2|gif?)(\?\S*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.less$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            // },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            xhtml: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        contentBase: 'src',
        historyApiFallback: true
    }
};

if (debug) {
    config.plugins.push(
        new WatchLiveReloadPlugin({
            files: ['./src/**/*.html', './src/**/*.css', './src/**/*.less', './src/**/*.scss']
        })
    );
} else {
    config.plugins.push(
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                colormin: true,
                discardDuplicates: true,
                discardOverridden: true,
                mergeLonghand: true,
                minifyFontValues: true,
                orderedValues: true,
                reduceDisplayValues: true,
                reduceInitial: true,
                uniqueSelectors: true,
                discardUnused: true,
                minifyGradients: true,
                minifySelectors: true,
                svgo: true
            },
            canPrint: true
        })
    );
}

/*
if (deploy) {
    config.plugins.push(
        new WebpackShellPlugin({
            onBuildEnd: 'node copyFilesToDist.js'
        })
    );
}
*/

module.exports = config;
