import { useGetActiveCartItems } from '@/hooks/queries/active-carts';
import StripeProvider from '@/app/private/customer/purchase/stripe-provider';
import Loader from '@/app/components/state/loading';
import PurchaseCartForDelivery from './for-delivery';
import PurchaseCartNoDelivery from './no-delivery';

const PurchaseCart = () => {
	const { data: items } = useGetActiveCartItems();

	if (!items) return <Loader />;
	const forDelivery = items.some((i) => i.forDelivery);

	if (!forDelivery)
		return (
			<StripeProvider>
				<PurchaseCartNoDelivery />
			</StripeProvider>
		);

	return (
		<StripeProvider>
			<PurchaseCartForDelivery />
		</StripeProvider>
	);
};

export default PurchaseCart;
