import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import { Response as Product } from '@/api/catalog/products/gallery/resources/all';
import styles from './model.module.css';
import useBytesToBuffer from '@/hooks/useBytesToBuffer';

interface ModelProps {
	product: Product;
}

const Model: React.FC<ModelProps> = ({ product }) => {
	const { data: file, isLoading } = useDownloadProductImage({
		id: product.id,
	});

	const presignedUrl: string = file?.presignedUrl ?? '';
	const contentType: string = file?.contentType ?? '';

	const buffer = useBytesToBuffer(presignedUrl, contentType);
	const blobUrl = useGenerateBlobUrl(contentType, buffer);

	if (isLoading) {
		return <>Loading...</>;
	}

	return (
		<div className={`${styles.model}`}>
			<b></b>
			<img src={blobUrl} alt='Model Picture' />
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
		</div>
	);
};

export default Model;
