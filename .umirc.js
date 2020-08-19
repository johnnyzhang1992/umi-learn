import { defineConfig } from 'umi';

export default defineConfig({
	dynamicImport: {
		loading: '@/components/Loading',
	},
	// ssr: {},
	// exportStatic: {
	// 	htmlSuffix: true,
	// },
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
	// metas
	metas: [
		{
			name: 'keywords',
			content: 'umi, umijs',
		},
		{
			name: 'description',
			content: '🍙 插件化的企业级前端应用框架。',
		},
	],
	locale: {
		antd: true,
		title: true,
		// default: 'zh-CN',
		baseSeparator: '-',
		baseNavigator: false,
	},
	// 路由控制
	// 暂缺权限路由控制
	title: 'site.title',
	routes: [
		{
			path: '/',
			component: '@/layout/index',
			routes: [
				{ path: '/', component: '@/pages/index', title: 'index.title' },
				{
					path: '/index',
					component: '@/pages/index',
					title: 'index.title',
				},
				{
					path: '/index-en',
					component: '@/pages/index',
					title: 'index.title',
				},
				{
					path: '/test',
					component: '@/pages/Test',
					title: 'test.title',
				},
				{
					path: '/test-en',
					component: '@/pages/Test',
					title: 'test.title',
				},
				{ component: '@/pages/404', title: '404.title' },
			],
		},
		{ component: '@/pages/404', title: '404.title' },
	],
});
