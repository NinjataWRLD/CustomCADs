import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './popular.module.css';

interface ModelProps {
	model: {
		src: string;
		name: string;
		likes: string;
		views: string;
		category: string;
		author: string;
		description: string;
		price: string;
		upload_date: string;
	};
}

const PopularModel: React.FC<ModelProps> = ({ model }) => {
	const router = useRouter();

	const handleDetailsClick = () => {
		router.push('/product');
	};

	return (
		<div className={`${styles.model}`}>
			<b></b>
			<Image
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
						<i className='fas fa-eye'></i>
						<div>{model.views}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularModel;
