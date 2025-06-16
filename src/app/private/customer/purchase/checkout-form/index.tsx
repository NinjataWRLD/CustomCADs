import { CreditCard, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { BillingDetails } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import * as payment from '@/api/common/payment';
import { useCheckoutFormTranslation } from '@/hooks/locales/pages/customer';
import { useCheckout } from './hooks/useCheckout';
import Transition from '@/app/components/transition';

interface CheckoutFormProps {
	type: 'cart' | 'custom';
	onSubmit: (req: payment.Request) => Promise<payment.Response>;
	back?: VoidFunction;
	details?: BillingDetails;
}

const CheckoutForm = ({ type, onSubmit, back, details }: CheckoutFormProps) => {
	const tCheckout = useCheckoutFormTranslation();
	const {
		isStripeLoaded,
		status,
		errorMessage,
		handleSubmit: handleCheckoutSubmit,
	} = useCheckout(details);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await handleCheckoutSubmit(onSubmit);
	};

	const cardElementOptions = {
		style: {
			base: {
				color: '#6B21A8',
				fontWeight: '500',
				fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
				fontSize: '16px',
				fontSmoothing: 'antialiased',
				'::placeholder': {
					color: '#A78BFA',
				},
			},
			invalid: {
				color: '#ef4444',
				iconColor: '#ef4444',
			},
		},
		hidePostalCode: true,
	};

	return (
		<Transition>
			<div className='h-[100dvh] flex justify-center items-center text-white'>
				<div className='w-1/2 mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden'>
					<div className='bg-purple-800 py-4 px-6'>
						<h2 className='text-white text-xl font-bold flex items-center'>
							<CreditCard className='mr-2' size={24} />
							{type === 'cart'
								? 'Cart Checkout'
								: 'Custom Checkout'}
						</h2>
					</div>

					{back && (
						<button
							onClick={back}
							className='flex items-center text-purple-700 hover:text-purple-900 mt-4 ml-6'
						>
							<ArrowLeft size={16} className='mr-1' />
							{'Back'}
						</button>
					)}

					<div className='p-6'>
						<div className='mb-6'>
							<label className='block text-gray-700 text-sm font-medium mb-2'>
								{'Card Details'}
							</label>
							<div className='border border-purple-300 p-4 rounded-lg bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent'>
								<CardElement options={cardElementOptions} />
							</div>
						</div>

						<div className='mt-6'>
							{status === 'error' && (
								<div className='flex items-center text-red-500 mb-4'>
									<AlertCircle size={16} className='mr-2' />
									<span>{errorMessage}</span>
								</div>
							)}

							{status === 'success' && (
								<div className='flex items-center text-green-600 mb-4'>
									<CheckCircle size={16} className='mr-2' />
									<span>{tCheckout('check_out')}</span>
								</div>
							)}

							<button
								onClick={handleSubmit}
								disabled={
									!isStripeLoaded ||
									status === 'processing' ||
									status === 'success'
								}
								className={`w-full py-3 px-4 rounded-lg font-bold text-white flex justify-center items-center cursor-pointer
                ${
					isStripeLoaded &&
					status !== 'processing' &&
					status !== 'success'
						? 'bg-purple-700 hover:bg-purple-800'
						: 'bg-purple-400 cursor-not-allowed'
				}`}
							>
								{status === 'processing' && (
									<svg
										className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
								)}
								{status === 'success' ? (
									<CheckCircle size={16} className='mr-2' />
								) : null}
								{status === 'success'
									? 'Payment Successful'
									: status === 'processing'
										? 'Processing...'
										: 'Complete Purchase'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default CheckoutForm;
