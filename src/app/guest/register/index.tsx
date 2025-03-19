import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@/routes/_guest/register.$role';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import styles from './styles.module.css';

const Register = () => {
	const { role } = Route.useParams();
	const { handleSubmit, ...fields } = useFields(
		role === 'client' ? 'Client' : 'Contributor',
	);

	const tRegister = useRegisterTranslation();
	if (role !== 'client' && role !== 'contributor')
		throw new Error("You must register as a 'client' or 'contributor'");

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
						<Button type='submit' text={tRegister('btn')} />
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
