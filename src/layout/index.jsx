import React from 'react';
import styles from './index.less';
import Navbar from '@/components/Navbar';

/**
 * 框架模板
 * 根据网页尺寸不同加载不同的模板，特别是navbar
 * @param {*} props
 */
const BasicLayout = props => {
	return (
		<div className={styles.layout_container}>
			<Navbar />
			<>{props.children}</>
			<div className={styles.footer}>&copy;2020</div>
		</div>
	);
};

export default BasicLayout;
