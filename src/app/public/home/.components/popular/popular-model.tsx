import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './popular.module.css';

interface ModelProps {
	model: {
		src: string;
		name: string;
		views: string;
		category: string;
		author: string;
		price: string;
		upload_date: string;
	};
}

const PopularModel: React.FC<ModelProps> = ({ model }) => {
	const navigate = useNavigate();

	const handleDetailsClick = () => {
		navigate('/product');
	};

	return (
		<div className={`${styles.model}`}>
			<b></b>
			<img
				onClick={handleDetailsClick}
				src={model.src}
				alt='Model Picture'
				width={736}
				height={0}
			/>
			<div className={`${styles.content}`}>
				<p onClick={handleDetailsClick} className={`${styles.title}`}>
					{model.name}
					<br />
					<span>{model.category}</span>
				</p>
				<div className={`${styles['button-container']}`}>
					<div className={`${styles.views}`}>
						<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
						<div>{model.views}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularModel;
