import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import { useCategoriesTranslation } from '@/hooks/locales/common/resources';
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
	const tCategories = useCategoriesTranslation();

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
			<img
				onClick={handleDetailsClick}
				src={blobUrl}
				alt='Model Picture'
				width={736}
				height={0}
			/>
			<div className={`${styles.content}`}>
				<p onClick={handleDetailsClick} className={`${styles.title}`}>
					{product.name}
					<br />
					<span>{tCategories(product.category)}</span>
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
