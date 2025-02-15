import { usePickRoleTranslation } from '@/hooks/locales/pages/guest';
import Transition from '@/app/components/transition';
import Card from './card';
import styles from './styles.module.css';

const PickRole = () => {
	const tPickRole = usePickRoleTranslation();

	return (
		<Transition>
			<div className={`${styles.container}`}>
				<h1>{tPickRole('title')}</h1>
				<div className={`${styles.cards}`}>
					<Card id='client' />
					<Card id='contributor' />
				</div>
			</div>
		</Transition>
	);
};

export default PickRole;
