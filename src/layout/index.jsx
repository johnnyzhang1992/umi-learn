import React from 'react';
import styles from './index.less';
import Navbar from '@/components/Navbar';

const BasicLayout = (props) => {
	return (
		<div className={styles.layout_container}>
            <Navbar />
            <div>
                {props.children}
            </div>
		</div>
	);
};

export default BasicLayout;
