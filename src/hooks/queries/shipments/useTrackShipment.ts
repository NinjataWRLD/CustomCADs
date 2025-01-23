import { useQuery } from '@tanstack/react-query';
import { track } from '@/api/delivery/shipments/requests';
import { Request } from '@/api/delivery/shipments/types/track';

const useTrackShipment = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'track', params],
		queryFn: async () => (await track(params)).data,
	});

export default useTrackShipment;
