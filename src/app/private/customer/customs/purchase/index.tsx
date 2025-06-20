import { Route } from '@/routes/(private)/_customer/customs/purchase/$id';
import StripeProvider from '../../purchase/stripe-provider';
import { useGetCustom } from '@/hooks/queries/customs/customer';
import Loader from '@/app/components/state/loading';
import PurchaseCustomForDelivery from './for-delivery';
import PurchaseCustomNoDelivery from './no-delivery';

const PurchaseCustom = () => {
	const { id } = Route.useParams();
	const { data: custom } = useGetCustom({ id });

	if (!custom) return <Loader />;
	const { forDelivery } = custom;

	if (!forDelivery)
		return (
			<StripeProvider>
				<PurchaseCustomNoDelivery id={id} />
			</StripeProvider>
		);

	return (
		<StripeProvider>
			<PurchaseCustomForDelivery id={id} />
		</StripeProvider>
	);
};

export default PurchaseCustom;
