import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/customizations/materials';

const useGetMaterials = () =>
	useQuery({
		queryKey: ['materials', 'all'],
		queryFn: async () => (await all()).data,
	});

export default useGetMaterials;
