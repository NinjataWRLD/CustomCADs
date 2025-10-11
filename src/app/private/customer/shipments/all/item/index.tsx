import { Response as Shipment } from '@/api/delivery/shipments/all';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import { usePopup } from '@/hooks/usePopup';
import Blur from '@/app/components/background/blur';
import * as dateTime from '@/utils/date-time';
import * as uuid from '@/utils/uuid';
import ShipmentTracks from '../tracks';

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
				<div
					className='relative bg-[rgba(100,70,181,0.308)] text-[white] flex items-center gap-20 px-[1%] py-[0.5%] rounded-[10px] border-2 border-solid border-[rgba(148,33,255,0.564)] hover:shadow-[0px_0px_10px_rgba(148,33,255,0.6),0px_0px_20px_rgba(148,33,255,0.4),0px_0px_30px_rgba(148,33,255,0.2)] hover:bg-[rgba(148,33,255,0.4)] hover:scale-105'
					onClick={handleClick}
					style={{
						transition: 'transform 1s ease, box-shadow 0.3s ease',
					}}
				>
					<div className='font-[bold] text-[1.1rem] ml-5'>
						{tShipments('item-title')}
						<span className='text-[rgb(219,170,230)]'>
							#{uuid.extractSegment(shipment.id, 'first')}
						</span>
					</div>
					<div>
						<p className='font-[bold] ml-[30px] text-[gray]'>
							{tShipments('country')}
						</p>
						<p className='font-[bold] ml-[30px]'>
							{shipment.address.country}
						</p>
					</div>
					<div>
						<p className='font-[bold] ml-[30px] text-[gray]'>
							{tShipments('city')}
						</p>
						<p className='font-[bold] ml-[30px]'>
							{shipment.address.city}
						</p>
					</div>
					<div>
						<p className='font-[bold] ml-[30px] text-[gray]'>
							{tShipments('street')}
						</p>
						<p className='font-[bold] ml-[30px]'>
							{shipment.address.street}
						</p>
					</div>
					<div>
						<p className='font-[bold] ml-[30px] text-[gray]'>
							{tShipments('requested-at')}
						</p>
						<p className='font-[bold] ml-[30px]'>
							{dateTime.format({ date: shipment.requestedAt })}
						</p>
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
