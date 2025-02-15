import styles from './styles.module.css';

interface SheetProps {
	title: string;
	icon: string;
	details: string;
}

const Sheet = ({ title, icon, details }: SheetProps) => {
	return (
		<div className={`${styles.sheet}`}>
			<i className={icon}></i>
			<div className={`${styles.text}`}>
				<div className={`${styles.title}`}>{title}</div>
				<div className={`${styles.details}`}>{details}</div>
			</div>
		</div>
	);
};

export default Sheet;
