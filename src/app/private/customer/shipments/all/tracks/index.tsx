import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import { useTrackShipment } from '@/hooks/queries/shipments';
import * as dateTime from '@/utils/date-time';
import * as uuid from '@/utils/uuid';
import TrackItem from './item';

type ShipmentTracksProps = {
	shipmentId: string;
	toggle: VoidFunction;
};
const ShipmentTracks = ({ shipmentId, toggle }: ShipmentTracksProps) => {
	const tShipments = useShipmentsTranslation();
	const { data: tracks } = useTrackShipment({ id: shipmentId });

	const formattedTracks = tracks
		? Object.entries(tracks).map(([date, { message, place }]) => ({
				date,
				place,
				message,
			}))
		: [];

	return (
		<div
			className='fixed text-white bg-black shadow-[0_4px_8px_rgba(0,0,0,0.2),0_0_20px_rgba(246,7,246,0.629)] rounded-lg p-10 z-50 text-center w-1/2 h-2/5 flex flex-col gap-5 justify-center items-center border-2 border-purple-800/20 transition-all duration-400 ease-in-out opacity-100 visible top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5 scale-100'
			style={{
				transitionProperty: 'opacity, transform, visibility',
			}}
		>
			<div
				className='absolute right-5 top-5 text-2xl cursor-pointer transition-colors duration-300 hover:text-pink-300/50'
				onClick={toggle}
			>
				<FontAwesomeIcon icon={faTimes} />
			</div>
			<h1 className='text-2xl capitalize font-bold title-text-shadow'>
				{tShipments('popup-title', {
					id: uuid.extractSegment(shipmentId, 'first'),
				})}
			</h1>

			<div className='flex w-2/3 mr-40'>
				<ul className='relative w-full flex flex-col justify-center items-center text-white gap-4 px-0'>
					<TrackItem
						date={tShipments('date-time')}
						place={
							formattedTracks.some(({ place }) => !!place)
								? tShipments('place')
								: undefined
						}
						message={tShipments('message')}
					/>
					{formattedTracks.map(({ date, message, place }) => (
						<TrackItem
							date={dateTime.format({ date })}
							message={message}
							place={place}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ShipmentTracks;
