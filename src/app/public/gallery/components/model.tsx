import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/resources/all';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import { useCategoriesTranslation } from '@/hooks/locales/common/resources';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import styles from './model.module.css';

interface ModelProps {
	product: Product;
}

const Model = ({ product }: ModelProps) => {
	const navigate = useNavigate();

	const tCategories = useCategoriesTranslation();
	const tFetch = useFetchTranslation();

	const { data: file, isLoading } = useDownloadProductImage({
		id: product.id,
	});

	const blobUrl = useGenerateBlobUrl(file?.contentType, file?.presignedUrl);

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	const handleClick = () => navigate(`${product.id}`);

	return (
		<div className={`${styles.model}`} onClick={handleClick}>
			<b></b>
			<img src={blobUrl} alt='Model Picture' />
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

export default Model;
