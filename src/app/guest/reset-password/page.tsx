import { Link } from 'react-router-dom';
import { useResetPasswordTranslation } from '@/hooks/locales/pages/guest';
import useSearchParams from '@/hooks/useSearchParams';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import useFields from './hooks/useFields';
import faviconPic from '@/assets/favicons/favicon.svg';
import styles from './styles.module.css';

const ResetPassword = () => {
	const tResetPassword = useResetPasswordTranslation();
	const { getParam } = useSearchParams();
	const { handleSubmit, ...fields } = useFields(
		getParam('email') ?? '',
		getParam('token') ?? '',
	);

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
						<BtnLink
							text={tResetPassword('button')}
							type='submit'
						/>
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
