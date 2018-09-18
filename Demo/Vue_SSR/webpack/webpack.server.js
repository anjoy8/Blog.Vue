/* 5、webpack.server.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');


module.exports = {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    target: 'node',
    entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-server.js')],
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.server.js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins: [],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    }
}
