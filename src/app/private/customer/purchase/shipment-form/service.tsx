import { Calculation } from '@/api/common/calculation';
import * as dateTime from '@/utils/date-time';

interface ShipmentServiceProps {
	calculation: Calculation;
}
const ShipmentService = ({ calculation }: ShipmentServiceProps) => {
	const { service, total, currency, pickupDate } = calculation;

	const serviceInfo = `${service} - ${total} ${currency}`;
	const pickUpInfo = `Pick up - ${dateTime.format({ date: pickupDate, dateOnly: true })}`;

	return (
		<option key={service}>
			<span>
				{serviceInfo}; {pickUpInfo}
			</span>
		</option>
	);
};

export default ShipmentService;
