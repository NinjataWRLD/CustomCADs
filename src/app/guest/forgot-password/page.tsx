import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordTranslation } from '@/hooks/locales/pages/guest';
import useFields from './hooks/useFields';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
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
					<i
						className={`${styles.border}`}
						style={
							{ '--color': '#8c09ff5f' } as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{ '--color': '#550cf377' } as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{ '--color': '#e43bc85e' } as React.CSSProperties
						}
					></i>
					<img src={faviconImg} alt='CustomCADs' />
					<h1>{tForgotPassword('title')}</h1>
					<h3>{tForgotPassword('instruction')}</h3>

					<div className={`${styles['form-field']}`}>
						{EmailField}
					</div>

					<div className={`${styles.submit}`}>
						<BtnLink
							text={tForgotPassword('button')}
							type='submit'
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
