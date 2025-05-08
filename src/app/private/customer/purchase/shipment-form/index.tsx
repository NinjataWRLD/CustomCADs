import { Link } from '@tanstack/react-router';
import { useShipmentFormTranslation } from '@/hooks/locales/pages/customer';
import Transition from '@/app/components/transition';
import Border from '@/app/components/border';
import Button from '@/app/components/button';
import { useFields } from './hooks/useFields';
import { Fields } from './hooks/useForm';
import styles from './styles.module.css';

interface ShipmentFormProps {
	onSubmit: (values: Fields) => void;
	requireCount?: boolean;
}
const ShipmentForm = ({ onSubmit, requireCount }: ShipmentFormProps) => {
	const { handleSubmit, ...fields } = useFields(onSubmit);
	const tShipmentForm = useShipmentFormTranslation();

	return (
		<Transition>
			<div className={`${styles.shipment}`}>
				<form onSubmit={handleSubmit} className={`${styles.form}`}>
					<Border />
					<h1>{tShipmentForm(`title`)}</h1>

					<div className={`${styles['form-field']}`}>
						{fields.CountryField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.CityField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.StreetField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.EmailField}
					</div>

					<div className={`${styles['form-field']}`}>
						{fields.PhoneField}
					</div>

					{requireCount && (
						<div className={`${styles['form-field']}`}>
							{fields.CountField}
						</div>
					)}

					<div className={`${styles['form-field']}`}>
						{fields.ServiceField}
					</div>

					<div className={`${styles.submit}`}>
						<Button type='submit' text={tShipmentForm('btn')} />
					</div>

					<p>
						<Link className={styles.back} to='/'>
							{tShipmentForm('go-back')}
						</Link>
					</p>
				</form>
			</div>
		</Transition>
	);
};

export default ShipmentForm;
