import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useCreateCustomization } from '@/hooks/mutations/customizations';
import { useGetCustomization } from '@/hooks/queries/customizations';
import { CartItem } from '@/types/cart-item';

export const useCustomization = (loaded: boolean, item?: CartItem) => {
	const { mutateAsync: create, data } = useCreateCustomization();
	const customizationId =
		data?.id ?? (item?.forDelivery ? item.customizationId : null);

	const { data: customization, error: error } = useGetCustomization(
		{ id: customizationId! },
		!!customizationId,
	);

	useEffect(() => {
		const notFound = isAxiosError(error) && error.status === 404;
		if (loaded && (!customizationId || notFound)) {
			create({
				materialId: 1,
				color: '#ffffff',
				infill: 0.2,
				scale: 1,
				volume: 0,
			});
		}
	}, [loaded, customizationId, error]);

	return customization;
};
