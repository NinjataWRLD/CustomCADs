import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import styles from './styles.module.css';

interface AboutMeProps {
	username: string;
	role: string;
	createdAt: string;
}
const AboutMe = ({ role, username, createdAt }: AboutMeProps) => {
	const tMyAccount = useMyAccountTranslation();

	return (
		<>
			<div className={styles.section}>
				<div className={styles.username}>
					<h2>{tMyAccount('username')}</h2>
					<p>{username}</p>
				</div>
				<div className={styles.role}>
					<h2>{tMyAccount('user-role')}</h2>
					<p>{role}</p>
				</div>
				<div className={`${styles.member}`}>
					<h2>{tMyAccount('created-at')}</h2>
					<p>{createdAt}</p>
				</div>
			</div>

			{/* UI breaks when I remove this (╥﹏╥) */}
			<div className={`${styles.buttons}`} />
		</>
	);
};

export default AboutMe;
