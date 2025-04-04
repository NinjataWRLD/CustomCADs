import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/all';
import { useDownloadProductImage } from '@/hooks/queries/products/gallery';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import styles from './styles.module.css';

interface ItemProps {
	product: Product;
}

const Item = ({ product }: ItemProps) => {
	const tFetch = useFetchTranslation();

	const { data: file, isLoading } = useDownloadProductImage({
		id: product.id,
	});
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	return (
		<Link
			to='/gallery/$id'
			params={{ id: product.id }}
			className={`${styles.model}`}
		>
			<b></b>
			{blobUrl && <img src={blobUrl} alt='Product Image' />}
			<div className={`${styles.content}`}>
				<p className={`${styles.title}`}>
					{product.name}
					<br />
					<span>{product.category}</span>
				</p>
				<div className={`${styles['button-container']}`}>
					<div className={`${styles.views}`}>
						<FontAwesomeIcon icon={faEye} />
						<div>{product.views}</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Item;
