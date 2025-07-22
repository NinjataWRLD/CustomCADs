import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { CartItem } from '@/types/cart-item';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useCreateCustomization } from '@/hooks/mutations/customizations';
import { useGetCustomization } from '@/hooks/queries/customizations';

export const useCustomization = (loaded: boolean, item?: CartItem) => {
	const { idempotencyKeys } = useIdempotencyKeys(['create'] as const);
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
				idempotencyKey: idempotencyKeys.create,
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
