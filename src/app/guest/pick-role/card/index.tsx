import { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLightbulb,
	faPlus,
	faUser,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { usePickRoleTranslation } from '@/hooks/locales/pages/guest';
import BtnLink from '@/app/components/button';
import styles from './styles.module.css';

const Card = ({ id }: { id: 'client' | 'contributor' }) => {
	const tPickRole = usePickRoleTranslation();
	let headIcon: IconDefinition = undefined!;
	let title = '';
	let pluses: string[] = [];
	let btn: JSX.Element = <></>;

	switch (id) {
		case 'client':
			headIcon = faUser;
			title = tPickRole('client-subtitle');
			pluses = [
				tPickRole('client-plus-1'),
				tPickRole('client-plus-2'),
				tPickRole('client-plus-3'),
			];
			btn = <BtnLink text={tPickRole('btn')} link='/register/client' />;
			break;

		case 'contributor':
			headIcon = faLightbulb;
			title = tPickRole('contributor-subtitle');
			pluses = [
				tPickRole('contributor-plus-1'),
				tPickRole('contributor-plus-2'),
				tPickRole('contributor-plus-3'),
			];
			btn = (
				<BtnLink text={tPickRole('btn')} link='/register/contributor' />
			);
			break;

		default:
			break;
	}

	return (
		<div className={`${styles.card}`}>
			<div className={`${styles.icon}`}>
				<FontAwesomeIcon icon={headIcon} />
			</div>
			<div className={`${styles.content}`}>
				<h2>{title}</h2>
				<ul className={`fa-ul ${styles.list}`}>
					{pluses.map((p) => (
						<li key={p}>
							<span className='fa-li'>
								<FontAwesomeIcon icon={faPlus} />
							</span>
							{p}
						</li>
					))}
				</ul>
				{btn}
			</div>
		</div>
	);
};

export default Card;
