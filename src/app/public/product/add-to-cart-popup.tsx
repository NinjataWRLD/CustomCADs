import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import styles from './styles.module.css';

interface AddDetailsProps {
	id: string;
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	flashMessage: VoidFunction;
}

const AddToCartPopup = ({
	id,
	show,
	setShow,
	flashMessage,
}: AddDetailsProps) => {
	const tProduct = useProductTranslation();
	const navigate = useNavigate();

	const { addItem } = useCartUpdates();
	const toggleForDelivery = () => {
		setShow((prev) => !prev);
	};

	const addToCart = (forDelivery: boolean) => {
		setShow(false);
		flashMessage();

		if (!forDelivery)
			addItem({
				productId: id,
				forDelivery: false,
			});
		else navigate({ to: '/editor/$id', params: { id: id } });
	};

	return (
		<>
			{show && <div className={styles.blur}></div>}
			<div
				className={`${styles['buying-details']} ${show ? styles.show : ''}`}
			>
				<div className={styles.close} onClick={toggleForDelivery}>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<h1>{tProduct('add-details-title')}</h1>
				<div className={`${styles.buttons}`}>
					<button onClick={() => addToCart(true)}>
						<span>{tProduct('add-details-yes')}</span>
					</button>
					<button onClick={() => addToCart(false)}>
						<span>{tProduct('add-details-no')}</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default AddToCartPopup;
