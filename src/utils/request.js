/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
// import { history } from 'umi';
import { API_URL } from '@/globalConfig';

let requestToken;

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

notification.config({
	duration: 2,
});

/**
 * 退出
 */
const logout = () => {
	// eslint-disable-next-line no-underscore-dangle
	localStorage.clear();
	window.location.href = '/user/login';
	// eslint-disable-next-line no-underscore-dangle
	// window.g_app._store.dispatch({
	// 	type: 'user/destoryCurrentUser',
	// });
	// if (window.location.pathname !== '/user/login') {
	// 	// eslint-disable-next-line no-underscore-dangle
	// 	window.g_app._store.dispatch({
	// 		type: 'login/logout',
	// 	});
	// }
};

/**
 * 异常处理程序
 */

const errorHandler = async error => {
	// eslint-disable-next-line no-console
	console.log(error);
	const { response = {} } = error;
	const statusCode = (response && response.status) || 500;
	const errortext = codeMessage[statusCode] || response.statusText;
	// const { status } = response;
	if (statusCode > 200 && statusCode !== 401) {
		notification.warning({
			// message: `Request Error ${status || statusCode || 404}`,
			className: 'globalNoti',
			message: '',
			description: errortext || codeMessage['404'],
		});
	}
	if (statusCode === 401) {
		const data = await response.clone().json();
		if (data && data.message) {
			const { message } = data;
			if (message) {
				// eslint-disable-next-line no-console
				console.log(message);
				notification.warning({
					// message: `请求错误 ${status || statusCode || 404}`,
					className: 'globalNoti',
					message: '',
					description: message || errortext,
				});
				// Token过期，退出重新登录
				logout();
			}
		}
	}
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
	maxCache: 10, //
	// useCache: true,
	// getResponse: true,
	// headers: {
	// 	type: 2, // 0-publisher 1-partner 2- admin
	// 	Authorization: localStorage.getItem('token') || '',
	// },
	errorHandler,
	// 默认错误处理
	credentials: 'same-origin', // 默认请求是否带上cookie
});

// response拦截器, 处理response
request.interceptors.response.use(async response => {
	const { headers, status } = response;
	const { url } = response;
	// -------------------------
	// ---- 文件下载相关 开始----
	// 判断 response header 内 content-type 的类型
	if (
		headers.get('content-type').includes('application/vnd.ms-excel') ||
		headers.get('content-type').includes('application/csv') ||
		headers
			.get('content-type')
			.includes(
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			)
	) {
		const disponsition = headers.get('content-disposition');
		let fileName = 'test.xls';
		if (disponsition) {
			// const matchArray = disponsition.match(/(filename=")(.*)"/);
			const matchArray = disponsition.split('filename=');

			if (matchArray[1]) {
				// eslint-disable-next-line prefer-destructuring
				fileName = matchArray[1];
			}
		}
		const FileType =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		const Text = await response.clone().blob();
		const urlObject = window.URL || window.webkitURL || window;
		const exportBlob = new Blob([Text], { type: FileType });
		const saveLink = document.createElementNS(
			'http://www.w3.org/1999/xhtml',
			'a',
		);
		saveLink.href = urlObject.createObjectURL(exportBlob);
		saveLink.download = fileName;
		saveLink.click();
		notification.open({
			// message: `Request Error ${status || statusCode || 404}`,
			className: 'globalNoti',
			message: '',
			description: `${fileName}`,
		});
		return response;
	}
	// ---- 文件下载相关 结束----
	// -------------------------
	const data = await response.clone().json();
	// 若返回的headers 内有新token,则更新本地token值，并刷新页面
	if (headers.has('authorization')) {
		requestToken = headers.get('authorization');
		localStorage.setItem('token', requestToken);
		// eslint-disable-next-line no-console
		console.log('token更新:', url);
		window.location.reload();
	}
	// 只处理http 返回响应状态码为200 响应，其他的交给 errorHandle
	if (status === 200) {
		const resCode = data.status_code;
		if (data && resCode !== 200) {
			if (resCode !== 200) {
				let errorText = '';
				if (data.errors) {
					if (typeof data.errors === 'object') {
						errorText = JSON.stringify(data.errors);
					} else {
						errorText = data.errors.toString();
					}
				} else {
					errorText = data.message || codeMessage[resCode];
				}
				notification.warning({
					// message: `请求错误 ${resCode}: ${url}`,
					message: '',
					className: 'globalNoti',
					description: errorText,
				});
			}
		}
	}

	if (status === 401) {
		// 若请求三次仍错误，那直接退出
		notification.warning({
			className: 'globalNoti',
			message: '',
			description: 'Token 过期，请重新登录！',
		});

		logout();
	}
	return response;
});
// request 拦截器，处理 request
request.interceptors.request.use((url, options) => {
	const { headers } = options;
	return {
		url: url.includes(API_URL) ? url : `${API_URL}${url}`,
		options: {
			...options,
			interceptors: true,
			headers: {
				...headers,
				Authorization: requestToken || localStorage.getItem('token'),
			},
		},
	};
});

export default request;
