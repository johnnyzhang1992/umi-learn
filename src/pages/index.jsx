import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { useIntl } from 'umi';
import styles from './index.less';

const Hello = () => {
	const intl = useIntl();
	return (
		<h2 className={styles.title}>
			{intl.formatMessage(
				{
					id: 'name',
					defaultMessage: '你好，旅行者',
				},
				{
					name: '旅行者',
				},
			)}
		</h2>
	);
};
@connect(({ global }) => ({ global }))
class HomePage extends Component {
	// componentDidMount() {
	// 	console.log(this.props);
	// }

	handleLogin = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'global/login',
		});
	};

	handleLogout = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'global/logout',
		});
	};

	render() {
		const {
			global: { user },
		} = this.props;
		return (
			<div className={styles.container}>
				<h1 className={styles.title}>Page index</h1>
				<Hello />
				<div style={{ textAlign: 'center' }}>
					{user && user.id ? (
						<>
							<div>
								<span>{`ID:${user.id}; Name:${user.name}`}</span>
							</div>
							<Button type="default" onClick={this.handleLogout}>
								登出
							</Button>
						</>
					) : (
						<Button type="primary" onClick={this.handleLogin}>
							登录
						</Button>
					)}
				</div>
			</div>
		);
	}
}

export default HomePage;
