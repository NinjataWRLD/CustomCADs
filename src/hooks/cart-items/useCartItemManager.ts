import { useEffect } from 'react';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useCustomization } from '@/hooks/cart-items/useCustomization';

export const useCartItemManager = (productId: string) => {
	const { items } = useCartContext();
	const itemsLoaded = !!items;

	const item = items?.find((i) => i.productId === productId);

	const customization = useCustomization(itemsLoaded, item);
	const { addItem } = useCartUpdates();

	useEffect(() => {
		if (itemsLoaded && !item && customization)
			addItem({
				productId: productId,
				forDelivery: true,
				quantity: 1,
				customizationId: customization.id,
			});
	}, [items]);

	return { item, customization };
};
