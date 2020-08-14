import React from 'react';
import { NavLink } from 'umi';
import styles from './index.less';

const links = [
	{
		path: '/',
		name: '首页',
	},
	{
		path: '/test',
		name: '测试页',
	},
];

export default () => {
	return (
		<div className={styles.navbar_container}>
			{links.map(item => (
				<NavLink
                    to={ item.path }
                    exact
                    className={ styles.navbar_item}
                    activeClassName={ styles.navbar_selected}
					key={item.path}
				>
					{item.name}
				</NavLink>
			))}
		</div>
	);
};
