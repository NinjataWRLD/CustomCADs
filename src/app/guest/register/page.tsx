import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import BtnLink from '@/app/components/button/button';
import Transition from '@/app/components/transition/transition';
import useFields from './hooks/useFields';
import styles from './styles.module.css';

const Register = () => {
	const { role } = useParams();
	let formattedRole: 'Client' | 'Contributor' = 'Client';

	const { handleSubmit, ...fields } = useFields(formattedRole);

	const tRegister = useRegisterTranslation();

	switch (role) {
		case 'client':
			formattedRole = 'Client';
			break;
		case 'contributor':
			formattedRole = 'Contributor';
			break;
		default:
			return;
	}

	return (
		<Transition>
			<div className={`${styles.register}`}>
				<div className={`${styles.back}`}>
					<FontAwesomeIcon icon={faArrowLeft} />
					<Link to='/register'>{tRegister('go-back')}</Link>
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
					<h1>{tRegister(`title-${role}`)}</h1>
					<div className={`${styles.optionals}`}>
						<div className={`${styles['form-field']}`}>
							{fields.FirstNameField}
						</div>
						<div className={`${styles['form-field']}`}>
							{fields.LastNameField}
						</div>
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.UsernameField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.EmailField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.PasswordField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.ConfirmPasswordField}
					</div>

					<div className={`${styles.submit}`}>
						<BtnLink text={tRegister('btn')} type='submit' />
					</div>
				</form>

				<p>
					{tRegister('login-message')}
					<Link to='/login'> {tRegister('login')} </Link>
				</p>
			</div>
		</Transition>
	);
};

export default Register;
