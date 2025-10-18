import { useState } from 'react';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { usePurchaseActiveCartWithDelivery } from '@/hooks/mutations/active-carts';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import ShipmentForm from '@/app/private/customer/purchase/shipment-form';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

const PurchaseCartForDelivery = () => {
	const { idempotencyKeys } = useIdempotencyKeys(['purchase'] as const);
	const { mutateAsync } = usePurchaseActiveCartWithDelivery();

	type Step = 'shipment' | 'checkout';
	const [step, setStep] = useState<Step>('shipment');

	const { dispatch } = useCartContext();
	const [details, setDetails] = useState({
		email: '',
		phone: '',
		city: '',
		country: '',
		street: '',
		service: '',
	});

	if (step === 'shipment')
		return (
			<ShipmentForm
				onSubmit={(values) => {
					setStep('checkout');
					setDetails(values);
				}}
			/>
		);

	return (
		<CheckoutForm
			type='cart'
			onSubmit={async (req) => {
				const mutation = await mutateAsync({
					idempotencyKey: idempotencyKeys.purchase,
					...req,
					address: details,
					contact: details,
					shipmentService: details.service,
				});

				dispatch({ type: 'CLEAR_CART' });
				return mutation;
			}}
			back={() => setStep('shipment')}
		/>
	);
};

export default PurchaseCartForDelivery;
