import React from 'react';
import { Link } from '@tanstack/react-router';
import Transition from '../../transition';
import { useErrorTranslation } from '@/hooks/locales/common/state';
import styles from './styles.module.css';

interface ErrorPageProps {
	error: { status: '400' | '401' | '403' | '404' | 'default' };
}

const ErrorPage = ({ error }: ErrorPageProps) => {
	const tError = useErrorTranslation();
	const title = tError(`${error.status}_title`);
	const message = tError(`${error.status}_message`);
	const tip = tError(`${error.status}_tip`);

	return (
		<Transition>
			<div className={styles.container}>
				<h1 className={styles.title}>{title}</h1>
				<h3 className={styles.message}>{message}</h3>
				<p className={styles.tip}>{tip}</p>

				{error.status === '401' && (
					<div className={styles.link}>
						<Link to='/login'>{tError('login_link')}</Link>
					</div>
				)}

				<div className={styles.link}>
					<Link to='/'>{tError('contact_support_link')}</Link>
				</div>
			</div>
		</Transition>
	);
};

export default ErrorPage;
