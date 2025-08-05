import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { usePurchaseCustom } from '@/hooks/mutations/customs/customer';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

interface PurchaseCustomNoDeliveryProps {
	id: string;
}
const PurchaseCustomNoDelivery = ({ id }: PurchaseCustomNoDeliveryProps) => {
	const { idempotencyKeys } = useIdempotencyKeys(['purchase'] as const);
	const { mutateAsync } = usePurchaseCustom();
	return (
		<CheckoutForm
			type='custom'
			onSubmit={(req) =>
				mutateAsync({
					idempotencyKey: idempotencyKeys.purchase,
					...req,
					id,
				})
			}
		/>
	);
};

export default PurchaseCustomNoDelivery;
