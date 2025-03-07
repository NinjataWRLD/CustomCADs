import Transition from '@/app/components/transition';
import useFields from './hooks/useFields';
import BtnLink from '@/app/components/button';
import { useUploadProductTranslation } from '@/hooks/locales/pages/private/creator';
import styles from './styles.module.css';

const UploadProduct = () => {
	const { ref, handleSubmit, ...fields } = useFields();
	const tUploadProduct = useUploadProductTranslation();

	return (
		<Transition>
			<div className={styles.upload}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#8c09ff5f',
							} as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#550cf377',
							} as React.CSSProperties
						}
					></i>
					<i
						className={`${styles.border}`}
						style={
							{
								'--color': '#e43bc85e',
							} as React.CSSProperties
						}
					></i>
					<h1>{tUploadProduct('title')}</h1>

					<div className={`${styles['form-field']}`}>
						{fields.NameField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.DescriptionField}
					</div>

					<div className={`${styles['form-field']} ${styles.files}`}>
						{fields.CategoryField}
						{fields.PriceField}
					</div>

					<div className={`${styles['form-field']} ${styles.files}`}>
						{fields.ImageField}
						{fields.CadField}
					</div>

					<div className={`${styles.submit}`}>
						<BtnLink text={tUploadProduct('btn')} type='submit' />
					</div>
				</form>
			</div>
			<div ref={ref} style={{ display: 'none' }} />
		</Transition>
	);
};

export default UploadProduct;
