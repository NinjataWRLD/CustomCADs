import styles from './styles.module.css';

interface ButtonProps {
	type: 'button' | 'submit';
	text: string;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ text, type, disabled, onClick }: ButtonProps) => {
	switch (type) {
		case 'button':
			return (
				<div className={`${styles.link}`} onClick={onClick}>
					<div className={`${styles.button}`}>{text}</div>
					<div className={`${styles['button-gradient']}`}></div>
				</div>
			);
		case 'submit':
			return (
				<button
					type='submit'
					className={`${styles.link} ${styles.buttonWrapper}`}
					onClick={onClick}
					disabled={disabled}
				>
					<div className={`${styles.button}`}>{text}</div>
					<div className={`${styles['button-gradient']}`}></div>
				</button>
			);
		default:
	}
};

export default Button;
