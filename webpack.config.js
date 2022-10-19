const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

module.exports = {
    entry: './public/main.js',
    // Place where webpack store the bundle:
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        // plugin for webpack to process HTML files:
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // plugin for webpack to complie rust to web assembly:
        new WasmPackPlugin({
            // location of rust project (search Cargo.toml):
            crateDirectory: path.resolve(__dirname, '.')
        })
    ],
    // experimental features:
    experiments: {
        // enable WebAssembly for webpack:
        asyncWebAssembly: true
    }
}