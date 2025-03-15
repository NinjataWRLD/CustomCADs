import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
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

	const { data: download } = useDownloadProductImage({ id: product.id });
	const blobUrl = useGenerateBlobUrl(
		download?.presignedUrl,
		download?.contentType,
	);

	const handleDetailsClick = () => {
		navigate(`/gallery/${product.id}`);
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
