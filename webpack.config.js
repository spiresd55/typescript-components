const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'tsconfig.json'
                },
                exclude: [
                    /(\.(e2e)\.ts$)/
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
          decorators: path.resolve(__dirname, 'src/decorators/index')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
		    'ko': 'ko'
    },
    plugins: [
      new webpack.ProvidePlugin({
        'ko': 'ko',
        'window.ko': 'ko'
      })
    ]
};
