const path = require('path');
const isDev = process.env.NODE_ENV === 'dev' 

module.exports = {
    mode: isDev ? "development" : 'production',
    devtool: isDev ? "source-map" : '',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".less"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.less$/i,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  { loader: 'less-loader' }
                ],
            }

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        index: 'index.html',
        open: true
    }
}