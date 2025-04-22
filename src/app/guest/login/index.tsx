import { Link } from '@tanstack/react-router';
import { useLoginTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import styles from './styles.module.css';

const Login = () => {
	const { handleSubmit, ...fields } = useFields();
	const tLogin = useLoginTranslation();

	return (
		<Transition>
			<div className={`${styles.login}`}>
				<form onSubmit={handleSubmit} className={`${styles.form}`}>
					<Border />
					<h1>{tLogin(`title`)}</h1>

					<div className={`${styles['form-field']}`}>
						{fields.UsernameField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.PasswordField}
					</div>

					{fields.RememberMeField}

					<div className={`${styles.submit}`}>
						<Button type='submit' text={tLogin('btn')} />
					</div>

					<p>
						{tLogin('register-message')}
						<Link to='/register'> {tLogin('register')} </Link>
						<Link className={styles.back} to='/'>
							{tLogin('go-back')}
						</Link>
					</p>
				</form>
			</div>
		</Transition>
	);
};

export default Login;
