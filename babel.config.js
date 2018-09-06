const debug = (process.env.NODE_ENV || '').trim() !== 'production';

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['last 2 versions'] //['chrome >= 60', 'firefox ESR', 'edge > 13', 'safari >= 10', 'ie >= 11']
                },
                loose: true,
                modules: false,
                useBuiltIns: 'entry',
                debug: false
            }
        ],
        '@babel/react'
    ],
    plugins: [
        '@babel/transform-runtime',
        'react-html-attrs',
        'transform-class-properties',
        '@babel/proposal-json-strings',
        '@babel/proposal-object-rest-spread',
        '@babel/proposal-optional-catch-binding',
        '@babel/proposal-unicode-property-regex',
        '@babel/syntax-bigint',
        '@babel/syntax-dynamic-import',
        '@babel/transform-async-to-generator'
    ].concat(debug ? [] : ['@babel/transform-react-inline-elements'])
};
