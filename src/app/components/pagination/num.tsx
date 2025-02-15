import styles from './styles.module.css';

interface NumProps {
	num: number;
	active: boolean;
	handleClick: (num: number) => void;
}

const Num = ({ num, active, handleClick }: NumProps) => {
	return (
		<button
			key={num}
			className={`${styles.pageBtn} ${active ? styles.active : ''}`}
			onClick={() => handleClick(num)}
		>
			{num}
		</button>
	);
};

export default Num;
