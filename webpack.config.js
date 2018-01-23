var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var NameAllModulesPlugin = require('name-all-modules-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        app: ['./src/js/App.jsx'],
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'axios',
            'redux',
            'redux-devtools-extension',
            'redux-thunk',
            'redux-logger',
            'redux-promise-middleware',
            'react-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, process.env.NODE_DEPLOY ? 'dist' : 'src'),
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
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
                })
            },
            {
                test: /\.(ttf|jpe?g|png|otf|ico|eot|svg|woff|woff2|gif?)(\?\S*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.s(a|c)ss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!resolve-url-loader!sass-loader?sourceMap'
                })
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
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }

            return chunk.mapModules(m => path.relative(m.context, m.request)).join('_');
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new NameAllModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            xhtml: true
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            allChunks: true
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

    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
} else {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
                //mangle: false,
                compress: {
                    warnings: false
                },
                minimize: true
            }
        })
    );

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
if (process.env.NODE_DEPLOY) {
    config.plugins.push(
        new WebpackShellPlugin({
            onBuildEnd: 'node copyFilesToDist.js'
        })
    );
}
*/

module.exports = config;
