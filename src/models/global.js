import { Fetch_Users, Fetch_Login } from '../services/global';
export default {
	namespace: 'global',
	state: {
		users: {
			name: 'johnny',
		},
		user: {},
	},
	reducers: {
		save_users(state, { payload: { users = [] } }) {
			return {
				...state,
				users,
			};
		},
		save(state, { payload }) {
			console.log(payload);
			return {
				...state,
				user: payload,
			};
		},
		logout(state) {
			return {
				...state,
				user: {},
			};
		},
	},
	effects: {
		*login({ payload }, { call, put }) {
			const response = yield call(Fetch_Login, {});
			console.log(response);
			yield put({
				type: 'save',
				payload: response.user,
			});
		},
		*fetch_users({ payload }, { call, put }) {
			const response = yield call(Fetch_Users, {});
			console.log(response);
			yield put({
				type: 'save_users',
				payload: response,
			});
		},
		*logout(_, { put }) {
			yield {
				type: 'logout',
			};
		},
	},
	subscriptions: {
		setup({ history, dispatch }) {
			// 监听 history 变化，当进入 `/` 时触发 `load` action
			return history.listen(({ pathname }) => {
				if (pathname === '/') {
					dispatch({ type: 'load' });
				}
			});
		},
	},
};
