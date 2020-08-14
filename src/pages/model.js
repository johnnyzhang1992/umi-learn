export default {
	namespace: 'home',
	state: {
		home: {
			list: [],
			page: 1,
			size: 10,
		},
	},
	reducers: {},
	effects: {},
	// subscriptions: {
	// 	setup({ history, dispatch }) {
	// 		// 监听 history 变化，当进入 `/` 时触发 `load` action
	// 		return history.listen(({ pathname }) => {
	// 			if (pathname === '/') {
	// 				dispatch({ type: 'load' });
	// 			}
	// 		});
	// 	},
	// },
};
