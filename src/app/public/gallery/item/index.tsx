import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/resources/all';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import { useCategoriesTranslation } from '@/hooks/locales/common/resources';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import styles from './styles.module.css';

interface ItemProps {
	product: Product;
}

const Item = ({ product }: ItemProps) => {
	const navigate = useNavigate();

	const tCategories = useCategoriesTranslation();
	const tFetch = useFetchTranslation();

	const { data: file, isLoading } = useDownloadProductImage({
		id: product.id,
	});
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}
	const handleClick = () => navigate(`${product.id}`);

	return (
		<div className={`${styles.model}`} onClick={handleClick}>
			<b></b>
			{blobUrl && <img src={blobUrl} alt='Product Image' />}
			<div className={`${styles.content}`}>
				<p className={`${styles.title}`}>
					{product.name}
					<br />
					<span>{tCategories(product.category)}</span>
				</p>
				<div className={`${styles['button-container']}`}>
					<div className={`${styles.views}`}>
						<FontAwesomeIcon icon={faEye} />
						<div>{product.views}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
