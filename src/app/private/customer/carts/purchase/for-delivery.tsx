import { useState } from 'react';
import { usePurchaseActiveCartWithDelivery } from '@/hooks/mutations/active-carts';
import ShipmentForm from '@/app/private/customer/purchase/shipment-form';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

const PurchaseCartForDelivery = () => {
	const { mutateAsync } = usePurchaseActiveCartWithDelivery();

	type Step = 'shipment' | 'checkout';
	const [step, setStep] = useState<Step>('shipment');

	const [details, setDetails] = useState({
		email: '',
		phone: '',
		city: '',
		country: '',
		service: '',
	});

	if (step === 'shipment')
		return (
			<ShipmentForm
				onSubmit={(values) => {
					setStep('checkout');
					setDetails({
						email: values.email,
						phone: values.phone,
						city: values.city,
						country: values.country,
						service: values.service,
					});
				}}
			/>
		);

	return (
		<CheckoutForm
			onSubmit={(req) =>
				mutateAsync({
					...req,
					address: details,
					contact: details,
					shipmentService: details.service,
				})
			}
			back={() => setStep('shipment')}
		/>
	);
};

export default PurchaseCartForDelivery;
