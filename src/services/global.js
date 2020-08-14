import { request } from 'umi';

export const Fetch_Users = async () => {
	return request(`/api/users`, {});
};

export const Fetch_Login = async () => {
	return request(`/api/login`, {
		method: 'post',
	});
};
