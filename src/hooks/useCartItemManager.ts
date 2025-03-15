import { useEffect } from 'react';
import { useCreateCustomization } from '@/hooks/mutations/customizations';
import { useGetCustomization } from '@/hooks/queries/customizations';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { isAxiosError } from '@/utils/api';

export const useCartItemManager = (productId: string) => {
	const { items } = useCartContext();
	const item = items?.find((i) => i.productId === productId);

	const { mutateAsync: createCustomization, data: createCustomizationData } =
		useCreateCustomization();

	const customizationId =
		createCustomizationData?.id ??
		(item?.forDelivery ? item.customizationId : null);

	const { data: customization, error: customizationError } =
		useGetCustomization({ id: customizationId! }, !!customizationId);

	useEffect(() => {
		if (
			items &&
			(!customizationId || isAxiosError(customizationError, 404))
		) {
			createCustomization({
				materialId: 1,
				color: '#ffffff',
				infill: 0.2,
				scale: 1,
				volume: 0,
			});
		}
	}, [items, customizationId, customizationError]);

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
