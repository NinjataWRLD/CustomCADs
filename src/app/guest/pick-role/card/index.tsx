import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { usePickRoleTranslation } from '@/hooks/locales/pages/guest';
import CustomLink from '@/app/components/link';
import styles from './styles.module.css';

const Card = ({ id }: { id: 'client' | 'contributor' }) => {
	const tPickRole = usePickRoleTranslation();

	return (
		<div className={`${styles.card}`}>
			<div className={`${styles.icon}`}>
				<FontAwesomeIcon
					icon={id === 'client' ? faUser : faLightbulb}
				/>
			</div>
			<div className={`${styles.content}`}>
				<h2>{tPickRole(`${id}-subtitle`)}</h2>
				<ul className={`fa-ul ${styles.list}`}>
					{[
						tPickRole(`${id}-plus-1`),
						tPickRole(`${id}-plus-2`),
						tPickRole(`${id}-plus-3`),
					].map((p) => (
						<li key={p}>
							<span className='fa-li'>
								<FontAwesomeIcon icon={faPlus} />
							</span>
							{p}
						</li>
					))}
				</ul>
				<CustomLink
					text={tPickRole('btn')}
					to='/register/$role'
					params={{ role: id }}
				/>
			</div>
		</div>
	);
};

export default Card;
