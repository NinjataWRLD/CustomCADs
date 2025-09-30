import { useEffect } from 'react';
import { Route } from '@/routes/(private)/_customer/shipments';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import { useNotFoundTranslation } from '@/hooks/locales/common/messages';
import Transition from '@/app/components/transition';
import Pagination from '@/app/components/pagination';
import ShipmentItem from './item';
import styles from './styles.module.css';
import { useShipmentsDropdowns } from './hooks/useShipmentsDropdowns';

const SHIPMENTS_PER_PAGE = 6;
const Shipments = () => {
	const { shipments } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const dropdowns = useShipmentsDropdowns();
	const tShipments = useShipmentsTranslation();
	const tNotFound = useNotFoundTranslation();

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
			  .shipments::-webkit-scrollbar {
				  width: 8px;
			   }
	
			  .shipments::-webkit-scrollbar-thumb {
				  background-color: #888;
				  border-radius: 10px;
			   }
	
			  .shipments > * {
				  flex: 0 0 auto;
			   }
			`;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tShipments('title')}</h1>
				<div className={styles.sorting}>{<dropdowns.Sortings />}</div>
				<div
					className={styles.shipments}
					style={{
						overflowY:
							shipments && shipments.count > 2 ? 'auto' : 'unset',
						scrollbarWidth: 'thin',
						scrollbarColor: '#aaa transparent',
					}}
				>
					{shipments.items.length ? (
						shipments.items.map((shipment) => (
							<ShipmentItem
								key={shipment.id}
								shipment={shipment}
							/>
						))
					) : (
						<div className='min-h-[60dvh] flex items-center text-white text-2xl text-shadow-custom'>
							{tNotFound('no-products')}
						</div>
					)}
				</div>
				<Pagination
					total={shipments.count}
					defaultLimit={SHIPMENTS_PER_PAGE}
					navigate={(pagination) =>
						navigate({
							search: (prev) => ({
								...prev,
								...pagination,
							}),
						})
					}
				/>
			</div>
		</Transition>
	);
};

export default Shipments;
