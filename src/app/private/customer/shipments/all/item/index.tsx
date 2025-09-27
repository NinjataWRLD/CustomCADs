import { Response as Shipment } from '@/api/delivery/shipments/all';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import { usePopup } from '@/hooks/usePopup';
import Blur from '@/app/components/background/blur';
import * as dateTime from '@/utils/date-time';
import * as uuid from '@/utils/uuid';
import ShipmentTracks from '../tracks';
import styles from './styles.module.css';

type ShipmentProps = { shipment: Shipment; onClick?: VoidFunction };
const ShipmentItem = ({ shipment, onClick }: ShipmentProps) => {
	const tShipments = useShipmentsTranslation();

	const popup = usePopup();
	const handleClick = () => {
		popup.toggle();
		onClick?.();
	};

	return (
		<>
			{popup.isOpen && <Blur />}
			<div ref={popup.ref}>
				<div className={styles.shipment} onClick={handleClick}>
					<div className={styles.id}>
						{tShipments('item-title')}
						<span>
							#{uuid.extractSegment(shipment.id, 'first')}
						</span>
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
				{popup.isOpen && (
					<ShipmentTracks
						shipmentId={shipment.id}
						toggle={popup.toggle}
					/>
				)}
			</div>
		</>
	);
};

export default ShipmentItem;
