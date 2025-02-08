import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLoginTranslation } from '@/hooks/locales/pages/guest';
import BtnLink from '@/app/components/button/button';
import Transition from '@/app/components/transition/transition';
import useFields from './hooks/useFields';
import styles from './styles.module.css';

const Login = () => {
	const { handleSubmit, ...fields } = useFields();
	const tLogin = useLoginTranslation();

	return (
		<Transition>
			<div className={`${styles.login}`}>
				<div className={`${styles.back}`}>
					<FontAwesomeIcon icon={faArrowLeft} />
					<Link to='/'>{tLogin('go-back')}</Link>
				</div>

				<form onSubmit={handleSubmit} className={`${styles.form}`}>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#8c09ff5f',
							} as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#550cf377',
							} as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#e43bc85e',
							} as React.CSSProperties
						}
					></i>
					<h1>{tLogin(`title`)}</h1>

					<div className={`${styles['form-field']}`}>
						{fields.UsernameField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.PasswordField}
					</div>

					{fields.RememberMeField}

					<div className={`${styles.submit}`}>
						<BtnLink text={tLogin('btn')} type='submit' />
					</div>

					<p>
						{tLogin('register-message')}
						<Link to='/register'> {tLogin('register')} </Link>
					</p>
				</form>
			</div>
		</Transition>
	);
};

export default Login;
