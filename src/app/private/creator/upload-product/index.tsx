import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import Btn from '@/app/components/button';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import styles from './styles.module.css';

const UploadProduct = () => {
	const { ref, cadSet, handleSubmit, ...fields } = useFields();
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
						<Btn type='submit' text={tUploadProduct('btn')} />
					</div>
				</form>
				<div
					ref={ref}
					style={
						cadSet
							? { width: '25%', height: '80%' }
							: { display: 'none' }
					}
				/>
			</div>
		</Transition>
	);
};

export default UploadProduct;
