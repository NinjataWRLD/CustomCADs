import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import styles from './styles.module.css';

const UploadProduct = () => {
	const { ref, cadSet, handleSubmit, ...fields } = useFields();
	const tUploadProduct = useUploadProductTranslation();

	return (
		<Transition>
			<div className={styles.upload}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Border />
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
						<Button type='submit' text={tUploadProduct('btn')} />
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
