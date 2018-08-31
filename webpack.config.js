var webpack = require('webpack');
var path = require('path');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const debug = (process.env.NODE_ENV || '').trim() !== 'production';
const deploy = process.env.NODE_DEPLOY !== undefined;

console.log('## Webpack 4 ###################');
console.log('debug mode: ', debug);
console.log('deploy mode: ', deploy);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.env.NODE_DEPLOY: ', process.env.NODE_DEPLOY);
console.log('################################');

var config = {
    // cache: false,
    mode: debug ? 'development' : 'production',
    context: __dirname,
    devtool: 'source-map',
    entry: { app: ['@babel/polyfill', './src/js/App.jsx'] },
    optimization: {
        usedExports: true,
        concatenateModules: true,
        occurrenceOrder: true,
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
    performance: {
        // maxEntrypointSize: 400000,
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
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
        })
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
