import { usePurchaseActiveCart } from '@/hooks/mutations/active-carts';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

const PurchaseCartNoDelivery = () => {
	const { idempotencyKeys } = useIdempotencyKeys(['purchase'] as const);
	const { mutateAsync } = usePurchaseActiveCart();

	return (
		<CheckoutForm
			type='cart'
			onSubmit={(req) =>
				mutateAsync({
					idempotencyKey: idempotencyKeys.purchase,
					...req,
				})
			}
		/>
	);
};

export default PurchaseCartNoDelivery;
