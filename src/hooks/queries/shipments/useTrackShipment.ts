import { useQuery } from '@tanstack/react-query';
import { track } from '@/api/delivery/shipments';
import { Request } from '@/api/delivery/shipments/resources/track';

const useTrackShipment = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'track', params],
		queryFn: async () => (await track(params)).data,
	});

export default useTrackShipment;
