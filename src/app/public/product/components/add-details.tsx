import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import useCartContext from '@/hooks/contexts/useCartContext';
import { CartItem } from '@/types/cart-item';
import styles from '../styles.module.css';

interface AddDetailsProps {
	id: string;
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	setShowMessage: (value: boolean) => void;
}

const AddDetails = ({ id, show, setShow, setShowMessage }: AddDetailsProps) => {
	const tProduct = useProductTranslation();
	const { dispatch: cartDispatch } = useCartContext();

	const toggleForDelivery = () => {
		setShow((prev) => !prev);
	};

	const addToCart = async (forDelivery: boolean) => {
		const weight = 5; // remove mock weight
		const item: CartItem = {
			productId: id,
			quantity: 1,
			weight: weight,
			forDelivery: forDelivery,
		};
		cartDispatch({ type: 'ADD_ITEM', item: item });

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
					<button onClick={() => addToCart(false)}>
						<span>{tProduct('add-details-yes')}</span>
					</button>
					<button onClick={() => addToCart(true)}>
						<span>{tProduct('add-details-no')}</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default AddDetails;
