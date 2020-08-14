import { defineConfig } from 'umi';

export default defineConfig({
	dynamicImport: {
		loading: '@/components/Loading',
	},
	hash: true,
	nodeModulesTransform: {
		type: 'none',
	},
	chunks: ['umi'],
	chainWebpack: function(config, { webpack }) {
		config.merge({
			optimization: {
				minimize: process.env.NODE_ENV === 'production' ? true : false,
				splitChunks: {
					chunks: 'all',
					minSize: 30000,
					minChunks: 3,
					automaticNameDelimiter: '.',
					cacheGroups: {
						vendor: {
							name: 'vendors',
							test({ resource }) {
								return /[\\/]node_modules[\\/]/.test(resource);
							},
							priority: 10,
						},
					},
				},
			},
		});
	},
	// locale: { antd: true },
	// 路由控制
	// 暂缺权限路由控制
	routes: [
		{
			exact: false,
			path: '/',
			component: '@/layout/index',
			routes: [
				{ path: '/', component: '@/pages/index', title: '首页' },
				{
					path: 'test',
					component: '@/pages/Test',
					title: '测试页',
				},
				{ component: '@/pages/404' },
			],
		},
		{ component: '@/pages/404' },
	],
});
