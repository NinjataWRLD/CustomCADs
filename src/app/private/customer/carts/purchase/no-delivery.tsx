import { usePurchaseActiveCart } from '@/hooks/mutations/active-carts';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

const PurchaseCartNoDelivery = () => {
	const { idempotencyKeys } = useIdempotencyKeys(['purchase'] as const);
	const { mutateAsync } = usePurchaseActiveCart();

	const { dispatch } = useCartContext();

	return (
		<CheckoutForm
			type='cart'
			onSubmit={async (req) => {
				const mutation = await mutateAsync({
					idempotencyKey: idempotencyKeys.purchase,
					...req,
				});

				dispatch({ type: 'CLEAR_CART' });
				return mutation;
			}}
		/>
	);
};

export default PurchaseCartNoDelivery;
