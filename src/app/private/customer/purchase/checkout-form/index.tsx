import { Link } from '@tanstack/react-router';
import { BillingDetails } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import * as payment from '@/api/common/payment';
import { useCheckoutFormTranslation } from '@/hooks/locales/pages/customer';
import { useCheckout } from './hooks/useCheckout';

interface CheckoutFormProps {
	type: 'cart' | 'custom';
	onSubmit: (req: payment.Request) => Promise<payment.Response>;
	back?: VoidFunction; // TODO: add 'back' link
	details?: BillingDetails;
}
const CheckoutForm = ({ type, onSubmit, details }: CheckoutFormProps) => {
	const tCheckout = useCheckoutFormTranslation();
	const {
		isStripeLoaded,
		status,
		errorMessage,
		handleSubmit: handleCheckoutSubmit,
	} = useCheckout(details);

	const button = (() => {
		switch (status) {
			case 'success':
				return tCheckout('paid');
			case 'processing':
				return tCheckout('processing');
			case 'awaiting':
			case 'error':
			default:
				return tCheckout('purchase');
		}
	})();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleCheckoutSubmit(onSubmit);
	};

	let link;
	switch (type) {
		case 'cart':
			link = <Link to='/carts'>{tCheckout('here')}!</Link>;
			break;
		case 'custom':
			link = <Link to='/'>{tCheckout('here')}!</Link>;
			break;
		default:
			throw new Error('Unsupported resource');
	}

	return (
		<div style={{ marginBlock: 300 }}>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<CardElement />
					</div>
					<div>
						{status === 'error' && <span>{errorMessage}</span>}
						{status === 'success' && (
							<span>
								<span>{tCheckout('check_out')} </span>
								{link}
							</span>
						)}
						<button
							type='submit'
							disabled={
								!isStripeLoaded ||
								status === 'processing' ||
								status === 'success'
							}
						>
							{button}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CheckoutForm;
