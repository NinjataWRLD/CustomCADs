import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useDownloadProductImage } from '@/hooks/queries/products/gallery';
import styles from './styles.module.css';

interface ItemProps {
	product: {
		id: string;
		name: string;
		views: number;
		category: string;
	};
}

const Item = ({ product }: ItemProps) => {
	const navigate = useNavigate();

	const { data: image } = useDownloadProductImage({ id: product.id });
	const blobUrl = useGenerateBlobUrl(image);

	const handleDetailsClick = () => {
		navigate({ to: '/gallery/$id', params: { id: product.id } });
	};

	return (
		<div className={`${styles.model}`}>
			<b></b>
			{blobUrl && (
				<img
					onClick={handleDetailsClick}
					src={blobUrl}
					alt='Product Image'
				/>
			)}
			<div className={`${styles.content}`}>
				<p onClick={handleDetailsClick} className={`${styles.title}`}>
					{product.name}
					<br />
					<span>{product.category}</span>
				</p>
				<div className={`${styles['button-container']}`}>
					<div className={`${styles.views}`}>
						<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
						<div>{product.views}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
