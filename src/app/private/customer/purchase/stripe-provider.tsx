import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const StripeProvider = ({ children }: React.PropsWithChildren) => (
	<Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
