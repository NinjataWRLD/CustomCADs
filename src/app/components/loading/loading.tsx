import styles from './styles.module.css';

const LoadingComponent = () => {
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

export default LoadingComponent;