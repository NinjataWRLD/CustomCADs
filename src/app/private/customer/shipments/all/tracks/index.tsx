import { useTrackShipment } from '@/hooks/queries/shipments';
import * as dateTime from '@/utils/date-time';
import Loader from '@/app/components/state/loading';

type ShipmentTracksProps = { shipmentId: string };
const ShipmentTracks = ({ shipmentId }: ShipmentTracksProps) => {
	const { data: tracks } = useTrackShipment({ id: shipmentId });
	if (!tracks) return <Loader />;

	return (
		<>
			{Object.entries(tracks).map(([date, { message, place }]) => (
				<div key={date}>
					{dateTime.format({ date })}
					<br />
					{message}
					<br />
					{place}
				</div>
			))}
		</>
	);
};

export default ShipmentTracks;
