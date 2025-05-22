import { useState } from 'react';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useForgotPassword } from '@/hooks/queries/identity';
import styles from './styles.module.css';

interface SecurityProps {
	email: string;
}
const Security = ({ email }: SecurityProps) => {
	const tMyAccount = useMyAccountTranslation();

	const [emailRequested, setEmailRequested] = useState(false);
	useForgotPassword({ email }, emailRequested);

	return (
		<div className={`${styles.security}`}>
			<div className={styles.section}>
				<div className={`${styles.email}`}>
					<h2>{tMyAccount('email')}</h2>
					<p>{email}</p>
				</div>
			</div>

			<div className={`${styles.section} ${styles.password}`}>
				<h2>{tMyAccount('forgot-password')}</h2>
				<p>{tMyAccount('security-warnring')}</p>
				<button onClick={() => setEmailRequested(true)}>
					{tMyAccount('change-password')}
				</button>
			</div>
		</div>
	);
};

export default Security;
