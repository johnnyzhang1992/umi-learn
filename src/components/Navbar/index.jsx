import React from 'react';
import { NavLink, getLocale } from 'umi';
import styles from './index.less';

// const links = [
// 	{
// 		path: '/index.html',
// 		name: '首页',
// 	},
// 	{
// 		path: '/test.html',
// 		name: '测试页',
// 	},
// ];

// const enLinks = [
// 	{
// 		path: '/index-en.html',
// 		name: 'Home Page',
// 	},
// 	{
// 		path: '/test-en.html',
// 		name: 'Test Page',
// 	},
// ];
const links = [
	{
		path: '/index',
		name: '餐厅',
	},
	{
		path: '/test',
		name: '测试页',
	},
];

const enLinks = [
	{
		path: '/index-en',
		name: 'Resturant',
	},
	{
		path: '/test-en',
		name: 'Test Page',
	},
];

export default () => {
	const lang = getLocale();
	console.log('---navbar--update');
	const LinksArr = lang === 'zh-CN' ? links : enLinks;
	return (
		<div className={styles.navbar_container}>
			{LinksArr.map(item => (
				<NavLink
					to={item.path}
					exact
					className={styles.navbar_item}
					activeClassName={styles.navbar_selected}
					key={item.path}
				>
					{item.name}
				</NavLink>
			))}
		</div>
	);
};
