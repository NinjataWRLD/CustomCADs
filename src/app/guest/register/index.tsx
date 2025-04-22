import { Link } from '@tanstack/react-router';
import { Route } from '@/routes/_guest/register/$role';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import styles from './styles.module.css';

const Register = () => {
	const { role } = Route.useParams();
	const { handleSubmit, ...fields } = useFields(
		role === 'customer' ? 'Customer' : 'Contributor',
	);

	const tRegister = useRegisterTranslation();
	if (role !== 'customer' && role !== 'contributor')
		throw new Error("You must register as a 'customer' or 'contributor'");

	return (
		<Transition>
			<div className={`${styles.register}`}>
				<form onSubmit={handleSubmit} className={`${styles.form}`}>
					<Border />
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

					<p>
						{tRegister('login-message')}
						<Link to='/login'> {tRegister('login')} </Link>
					</p>
				</form>
			</div>
		</Transition>
	);
};

export default Register;
