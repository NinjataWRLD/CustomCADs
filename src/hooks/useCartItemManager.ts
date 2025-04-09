import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useCreateCustomization } from '@/hooks/mutations/customizations';
import { useGetCustomization } from '@/hooks/queries/customizations';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useCartContext } from '@/hooks/contexts/useCartContext';

export const useCartItemManager = (productId: string) => {
	const { items } = useCartContext();
	const item = items?.find((i) => i.productId === productId);

	const { mutateAsync: create, data: createData } = useCreateCustomization();

	const customizationId =
		createData?.id ?? (item?.forDelivery ? item.customizationId : null);

	const { data: customization, error: error } = useGetCustomization(
		{ id: customizationId! },
		!!customizationId,
	);

	useEffect(() => {
		const notFound = isAxiosError(error) && error.status === 404;
		if (items && (!customizationId || notFound)) {
			create({
				materialId: 1,
				color: '#ffffff',
				infill: 0.2,
				scale: 1,
				volume: 0,
			});
		}
	}, [items, customizationId, error]);

	const { addItem } = useCartUpdates();
	useEffect(() => {
		if (items && !item && customizationId)
			addItem({
				productId: productId,
				forDelivery: true,
				quantity: 1,
				customizationId: customizationId,
			});
	}, [items]);

	return { item, customization };
};
