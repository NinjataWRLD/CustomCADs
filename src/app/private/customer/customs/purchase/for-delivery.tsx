import { useState } from 'react';
import { usePurchaseCustomWithDelivery } from '@/hooks/mutations/customs/customer';
import ShipmentForm from '@/app/private/customer/purchase/shipment-form';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

interface PurchaseCustomForDeliveryProps {
	id: string;
}
const PurchaseCustomForDelivery = ({ id }: PurchaseCustomForDeliveryProps) => {
	const { mutateAsync } = usePurchaseCustomWithDelivery();

	type Step = 'shipment' | 'customization' | 'checkout';
	const [step, setStep] = useState<Step>('shipment');

	const [details, setDetails] = useState({
		email: '',
		phone: '',
		city: '',
		country: '',
		count: 0,
		service: '',
	});

	if (step === 'shipment')
		return (
			<ShipmentForm
				onSubmit={(values) => {
					setStep('customization');
					setDetails({
						email: values.email,
						phone: values.phone,
						city: values.city,
						country: values.country,
						count: values.count,
						service: values.service,
					});
				}}
				requestCount
			/>
		);

	return (
		<CheckoutForm
			onSubmit={(req) =>
				mutateAsync({
					...req,
					id: id,
					address: details,
					contact: details,
					count: details.count,
					shipmentService: details.service,
					customizationId: '',
				})
			}
			back={() => setStep('shipment')}
		/>
	);
};

export default PurchaseCustomForDelivery;
