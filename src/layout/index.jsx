import React, { Component } from 'react';
import { setLocale, useLocation } from 'umi';
import { Select } from 'antd';
// import { connect } from 'dva';

import styles from './index.less';
import Navbar from '@/components/Navbar';

const { Option } = Select;

const LocalBtn = props => {
	const { lang } = props;
	const location = useLocation();
	console.log('---localBtns:', lang, props);
	// select 语言切换
	const handleChange = value => {
		setLocale(value || 'zh-CN', true);
		// 更新当前网页
		// updateLangCurrentPage(value);
		updatePage(value);
	};

	// ---- 非SSR
	const updatePage = lang => {
		const { pathname } = location;
		const pathArr = pathname.split('/');
		const currentPath = pathArr[pathArr.length - 1];
		const isEn = currentPath.includes('-en');
		let newHref = '';
		// 切换到英文网页
		if (lang === 'en-US') {
			if (!isEn) {
				if (pathname === '/') {
					newHref = '/index-en';
				} else {
					pathArr[pathArr.length - 1] = currentPath + '-en';
					newHref = pathArr.join('/');
				}
			}
		} else {
			// 切换到中文网页
			pathArr[pathArr.length - 1] = currentPath.replace('-en', '');
			newHref = pathArr.join('/');
		}
		if (window.location) {
			window.location.href = newHref;
		}
	};

	// --------- SSR --------------------
	// 切换语言后，相应的网页跳转到相应的语言
	const updateLangCurrentPage = lang => {
		const { pathname } = location;
		const pathArr = pathname.split('/');
		const currentPath = pathArr[pathArr.length - 1];
		const isEn = currentPath.includes('-en.html');
		let newHref = '';
		// 切换到英文网页
		if (lang === 'en-US') {
			if (!isEn) {
				if (pathname === '/') {
					newHref = '/index-en.html';
				} else {
					pathArr[pathArr.length - 1] = currentPath.replace(
						'.html',
						'-en.html',
					);
					newHref = pathArr.join('/');
				}
			}
		} else {
			// 切换到中文网页
			pathArr[pathArr.length - 1] = currentPath.replace(
				'-en.html',
				'.html',
			);
			newHref = pathArr.join('/');
		}
		if (window.location) {
			window.location.href = newHref;
		}
	};

	return (
		<Select
			value={lang || 'zh-CN'}
			style={{
				width: 100,
				position: 'fixed',
				right: '20px',
				top: '20px',
			}}
			onChange={handleChange}
		>
			<Option value="zh-CN">中文</Option>
			<Option value="en-US">英文</Option>
		</Select>
	);
};

/**
 * 框架模板
 * 根据网页尺寸不同加载不同的模板，特别是navbar
 * @param {*} props
 */
// @connect(({ global }) => ({ global }))
class BasicLayout extends Component {
	state = {
		lang: 'zh-CN',
	};
	componentDidMount() {
		// this.updateLangByHtmlName();
		this.updateLangByHtmlName(false);
	}

	// 根据html网页的名字更新当前浏览器语言
	updateLangByHtmlName = isSSR => {
		const { pathname } = location;
		const pathArr = pathname.split('/');
		const currentPath = pathArr[pathArr.length - 1];
		const isEn = isSSR
			? currentPath.includes('-en.html')
			: currentPath.includes('-en');
		if (isEn) {
			setLocale('en-US', false);
			this.setState({
				lang: 'en-US',
			});
		} else {
			setLocale('zh-CN', false);
		}
		if (pathname === '/') {
			setLocale('zh-CN', false);
		}
	};

	render() {
		const { lang } = this.state;
		console.log('--layout-lang:' + lang);
		return (
			<div className={styles.layout_container}>
				<LocalBtn lang={lang} />
				<Navbar lang={lang} />
				<>{this.props.children}</>
				<div className={styles.footer}>&copy;2020</div>
			</div>
		);
	}
}

export default BasicLayout;
