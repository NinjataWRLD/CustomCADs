import { usePurchaseCustom } from '@/hooks/mutations/customs/customer';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

interface PurchaseCustomNoDeliveryProps {
	id: string;
}
const PurchaseCustomNoDelivery = ({ id }: PurchaseCustomNoDeliveryProps) => {
	const { mutateAsync } = usePurchaseCustom();
	return (
		<CheckoutForm
			type='custom'
			onSubmit={(req) => mutateAsync({ ...req, id })}
		/>
	);
};

export default PurchaseCustomNoDelivery;
