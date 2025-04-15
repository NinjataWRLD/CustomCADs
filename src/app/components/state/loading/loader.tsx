import styles from './styles.module.css';

const Loader = () => {
	return (
		<div className={`${styles.loader}`}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default Loader;
