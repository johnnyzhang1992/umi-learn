export default {
	// 支持值为 Object 和 Array
	'POST /api/login': {
		user: {
			id: 1,
			name: 'johnny',
		},
	},
	'GET /api/users': {
		users: [
			{
				id: 1,
				name: 'jack',
			},
			{
				id: 2,
				name: 'make',
			},
		],
	},
	// GET 可忽略
	'/api/users/1': { id: 1, name: 'jack' },
	// 支持自定义函数，API 参考 express@4
	'POST /api/users/create': (req, res) => {
		// 添加跨域请求头
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end('ok');
	},
};
