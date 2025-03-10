import { Link } from 'react-router-dom';
import styles from './styles.module.css';

type BtnProps =
	| {
			type: 'button' | 'submit';
			text: string;
			disabled?: boolean;
			onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	  }
	| {
			type: 'link';
			text: string;
			link: string;
			disabled?: boolean;
			scrollTargetId?: string;
	  };

const Btn = (props: BtnProps) => {
	switch (props.type) {
		case 'button':
			return (
				<div className={`${styles.link}`} onClick={props.onClick}>
					<div className={`${styles.button}`}>{props.text}</div>
					<div className={`${styles['button-gradient']}`}></div>
				</div>
			);
		case 'submit':
			return (
				<button
					type='submit'
					className={`${styles.link} ${styles.buttonWrapper}`}
					onClick={props.onClick}
					disabled={props.disabled}
				>
					<div className={`${styles.button}`}>{props.text}</div>
					<div className={`${styles['button-gradient']}`}></div>
				</button>
			);
		case 'link': {
			const scroll = !!props.scrollTargetId;
			const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
				e.preventDefault();
				if (scroll) {
					const targetElement = document.getElementById(
						props.scrollTargetId!,
					);
					if (targetElement) {
						targetElement.scrollIntoView({ behavior: 'smooth' });
					}
				}
			};

			return (
				<Link
					to={scroll ? '#' : props.link}
					onClick={scroll ? handleScroll : undefined}
					className={`${styles.link}`}
				>
					<div className={`${styles.button}`}>{props.text}</div>
					<div className={`${styles['button-gradient']}`}></div>
				</Link>
			);
		}
		default:
	}
};

export default Btn;
