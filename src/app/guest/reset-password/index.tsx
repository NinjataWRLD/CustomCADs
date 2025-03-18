import { Link } from '@tanstack/react-router';
import { useResetPasswordTranslation } from '@/hooks/locales/pages/guest';
import { Route } from '@/routes/_guest/reset-password';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import { useFields } from './hooks/useFields';
import faviconPic from '@/assets/favicons/favicon.svg';
import styles from './styles.module.css';

const ResetPassword = () => {
	const tResetPassword = useResetPasswordTranslation();
	const search = Route.useSearch();
	const { handleSubmit, ...fields } = useFields(search);

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

					<img src={faviconPic} alt='CustomCADs' />
					<h1>{tResetPassword('title')}</h1>
					<h3>{tResetPassword('instruction')}</h3>

					<div className={`${styles['form-field']}`}>
						{fields.PasswordField}
					</div>
					<div className={`${styles['form-field']}`}>
						{fields.ConfirmPasswordField}
					</div>

					<div className={`${styles.submit}`}>
						<Button type='submit' text={tResetPassword('button')} />
					</div>
					<div className={`${styles.links}`}>
						<Link to='/login'>{tResetPassword('back')}</Link>
					</div>
				</form>
			</div>
		</Transition>
	);
};

export default ResetPassword;
