import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import useEditorStore from '@/hooks/stores/useEditorStore';
import useCartUpdates from '@/hooks/contexts/useCartUpdates';
import { CartItem } from '@/types/cart-item';
import styles from '../styles.module.css';

interface AddDetailsProps {
	id: string;
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	setShowMessage: (value: boolean) => void;
}

const AddToCartPopup = ({
	id,
	show,
	setShow,
	setShowMessage,
}: AddDetailsProps) => {
	const tProduct = useProductTranslation();
	const { weight } = useEditorStore(id);

	const { addItem } = useCartUpdates();
	const toggleForDelivery = () => {
		setShow((prev) => !prev);
	};

	const addToCart = async (forDelivery: boolean) => {
		const item: CartItem = {
			productId: id,
			quantity: 1,
			weight: weight,
			forDelivery: forDelivery,
		};
		addItem(item);

		setShow(false);
		setShowMessage(true);

		setTimeout(() => {
			setShowMessage(false);
		}, 3000);
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
