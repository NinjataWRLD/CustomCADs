import { Response as Shipment } from '@/api/delivery/shipments/all';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import * as dateTime from '@/utils/date-time';
import styles from './styles.module.css';

type ShipmentProps = { shipment: Shipment; onClick: VoidFunction };
const ShipmentItem = ({ shipment, onClick }: ShipmentProps) => {
	const tShipments = useShipmentsTranslation();

	return (
		<div className={styles.shipment} onClick={onClick}>
			<div className={styles.id}>
				{tShipments('item-title')}
				<span> #{shipment.id.split('-')[0]}</span>
			</div>
			<div className={styles.info}>
				<p>{tShipments('country')}</p>
				<p>{shipment.address.country}</p>
			</div>
			<div className={styles.info}>
				<p>{tShipments('city')}</p>
				<p>{shipment.address.city}</p>
			</div>
			<div className={styles.info}>
				<p>{tShipments('street')}</p>
				<p>{shipment.address.street}</p>
			</div>
			<div className={styles.info}>
				<p>{tShipments('requested-at')}</p>
				<p>{dateTime.format({ date: shipment.requestedAt })}</p>
			</div>
		</div>
	);
};

export default ShipmentItem;
