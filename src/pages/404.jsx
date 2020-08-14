import React from 'react';
import { Link } from 'umi';
const NotFoundPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignContent: 'center',
				alignItems: 'center',
				padding: '100px 0',
			}}
		>
			<div style={{ textAlign: 'center', flex: 1 }}>
				404 Not Found <Link to="/">返回首页</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
