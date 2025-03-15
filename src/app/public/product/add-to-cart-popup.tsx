import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const addToCart = async (forDelivery: boolean) => {
		setShow(false);
		flashMessage();

		if (!forDelivery)
			addItem({
				productId: id,
				quantity: 1,
				forDelivery: false,
			});
		else navigate(`/editor/${id}`, { state: { allow: true } });
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
