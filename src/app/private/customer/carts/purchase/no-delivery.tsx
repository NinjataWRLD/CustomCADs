import { usePurchaseActiveCart } from '@/hooks/mutations/active-carts';
import CheckoutForm from '@/app/private/customer/purchase/checkout-form';

const PurchaseCartNoDelivery = () => {
	const { mutateAsync } = usePurchaseActiveCart();
	return <CheckoutForm type='cart' onSubmit={(req) => mutateAsync(req)} />;
};

export default PurchaseCartNoDelivery;
