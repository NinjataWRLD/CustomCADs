import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../pagination.module.css';

interface ButtonProps {
	direction: 'prev' | 'next';
	duplicate?: boolean;
	disabled?: boolean;
	handleClick: VoidFunction;
}

const Button = ({
	direction,
	duplicate,
	disabled,
	handleClick,
}: ButtonProps) => {
	let style: string;
	let icon: IconDefinition;

	switch (direction) {
		case 'next':
			style = styles.nextBtn;
			icon = faChevronLeft;
			break;

		case 'prev':
			style = styles.prevBtn;
			icon = faChevronRight;
			break;

		default:
			style = null!;
			icon = null!;
			break;
	}

	return (
		<button className={style} onClick={handleClick} disabled={disabled}>
			<div className={`${styles['button-box']}`}>
				<span className={`${duplicate ? styles.element : styles.icon}`}>
					<FontAwesomeIcon icon={icon} />
					{duplicate && <FontAwesomeIcon icon={icon} />}
				</span>
				<span className={`${duplicate ? styles.element : styles.icon}`}>
					<FontAwesomeIcon icon={icon} />
					{duplicate && <FontAwesomeIcon icon={icon} />}
				</span>
			</div>
		</button>
	);
};

export default Button;
