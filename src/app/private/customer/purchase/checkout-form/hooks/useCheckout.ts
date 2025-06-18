import { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { BillingDetails } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import * as payment from '@/api/common/payment';

export const useCheckout = (details?: BillingDetails) => {
	const stripe = useStripe();
	const elements = useElements();

	const [status, setStatus] = useState<
		'awaiting' | 'processing' | 'success' | 'error'
	>('awaiting');
	const [errorMessage, setErrorMessage] = useState<string>();

	const handleError = async (error: AxiosError<{ clientSecret: string }>) => {
		if (!stripe) return;
		setStatus('error');

		const { response, message } = error;
		if (response?.status !== 400) {
			setErrorMessage(message);
			return;
		}

		const { clientSecret } = response.data;
		const intent = await stripe.confirmCardPayment(clientSecret);

		if (intent?.error) setErrorMessage(intent.error.message ?? '');
		else setStatus('success');
	};

	type PaymentCallback = (req: payment.Request) => Promise<payment.Response>;
	const handleSubmit = async (callback: PaymentCallback) => {
		if (!elements || !stripe) return;

		setStatus('processing');
		const card = elements.getElement(CardElement);
		if (!card) return;

		const result = await stripe.createPaymentMethod({
			type: 'card',
			card: card,
			billing_details: details,
		});

		if (result.error) {
			setStatus('error');
			setErrorMessage(result.error.message ?? '');
			return;
		}

		try {
			await callback({ paymentMethodId: result.paymentMethod.id });
			setStatus('success');
		} catch (error) {
			if (isAxiosError(error)) {
				await handleError(error);
			} else throw error;
		}
	};

	return {
		isStripeLoaded: !!stripe,
		status,
		errorMessage,
		handleSubmit,
	};
};
