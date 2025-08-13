import { useState } from 'react';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { usePurchaseCustomWithDelivery } from '@/hooks/mutations/customs/customer';
import ShipmentForm from '@/app/private/customer/purchase/shipment-form';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

type PurchaseCustomForDeliveryProps = {
	id: string;
};
const PurchaseCustomForDelivery = ({ id }: PurchaseCustomForDeliveryProps) => {
	const { idempotencyKeys } = useIdempotencyKeys(['purchase'] as const);
	const { mutateAsync } = usePurchaseCustomWithDelivery();

	type Step = 'shipment' | 'customization' | 'checkout';
	const [step, setStep] = useState<Step>('shipment');

	const [details, setDetails] = useState({
		email: '',
		phone: '',
		city: '',
		country: '',
		street: '',
		count: 0,
		service: '',
	});

	if (step === 'shipment')
		return (
			<ShipmentForm
				onSubmit={(values) => {
					setStep('customization');
					setDetails(values);
				}}
				requireCount
			/>
		);

	return (
		<CheckoutForm
			type='custom'
			onSubmit={(req) =>
				mutateAsync({
					idempotencyKey: idempotencyKeys.purchase,
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
