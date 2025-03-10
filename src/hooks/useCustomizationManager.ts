import { useEffect } from 'react';
import { AxiosError } from 'axios';
import useCreateCustomization from '@/hooks/mutations/customizations/useCreateCustomization';
import useGetCustomization from '@/hooks/queries/customizations/useGetCustomization';
import useEditCustomization from './mutations/customizations/useEditCustomization';

const useCustomizationManager = (idParam?: string) => {
	const { mutateAsync: create, data: createData } = useCreateCustomization();
	const { mutateAsync: edit } = useEditCustomization();

	const id = createData?.id ?? idParam;
	const { data: customization, error } = useGetCustomization(
		{ id: id! },
		!!id,
	);

	const createDefault = async () =>
		await create({
			materialId: 1,
			color: '#ffffff',
			infill: 0.2,
			scale: 1,
			volume: 0,
		});

	useEffect(() => {
		if (!id || (error instanceof AxiosError && error.status === 404)) {
			createDefault();
		}
	}, [customization]);

	return { customization: customization, edit };
};

export default useCustomizationManager;
