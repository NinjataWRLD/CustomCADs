export type CartItem =
	| {
			forDelivery: true;
			productId: string;
			quantity: number;
			customizationId: string;
	  }
	| {
			forDelivery: false;
			productId: string;
			quantity: 1;
	  };
