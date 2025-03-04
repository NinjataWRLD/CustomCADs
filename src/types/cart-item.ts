export interface CartItem {
	productId: string;
	quantity: number;
	forDelivery: boolean;
	customizationId?: string;
}
