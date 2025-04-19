import { FormEvent, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForgotPasswordTranslation } from '@/hooks/locales/pages/guest';
import { useFields } from './hooks/useFields';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import faviconImg from '@/assets/favicons/favicon.svg';
import styles from './styles.module.css';

const ForgotPassword = () => {
	const [showMessage, setShowMessage] = useState(false);
	const tForgotPassword = useForgotPasswordTranslation();

	const {
		EmailField,
		resendEmail,
		handleSubmit: handleFormSubmit,
	} = useFields();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		handleFormSubmit(e);
		setShowMessage(true);
	};

	return (
		<Transition>
			<div className={`${styles.container}`}>
				<form onSubmit={handleSubmit} className={`${styles.form}`}>
					<Border />
					<img src={faviconImg} alt='CustomCADs' />
					<h1>{tForgotPassword('title')}</h1>
					<h3>{tForgotPassword('instruction')}</h3>

					<div className={`${styles['form-field']}`}>
						{EmailField}
					</div>

					<div className={`${styles.submit}`}>
						<Button
							type='submit'
							text={tForgotPassword('button')}
						/>
						<div
							className={`${styles.transitionContainer} ${showMessage ? styles.show : ''}`}
						>
							<p>{tForgotPassword('message')}</p>
							<a onClick={() => resendEmail()}>
								{tForgotPassword('resend')}
							</a>
						</div>
					</div>

					<div className={`${styles.links}`}>
						<Link to='/login'>{tForgotPassword('back')}</Link>
					</div>
				</form>
			</div>
		</Transition>
	);
};

export default ForgotPassword;
