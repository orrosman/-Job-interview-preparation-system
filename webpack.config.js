const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: { main: path.resolve(__dirname, './api/client/src/index.js') },
	output: {
		path: path.resolve(__dirname, './api/dist'),
		filename: '[name].bundle.js',
		clean: true,
	},

	module: {
		rules: [
			{ test: /.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /.(svg|ico|png|gif|jpeg)$/, type: 'asset/resource' },
		],
	},

	plugins: [
		new HtmlWebPackPlugin({
			title: 'Job interview preparation system',
			filename: 'index.html',
			template: path.resolve(__dirname, './api/client/src/index.html'),
		}),
	],
};
