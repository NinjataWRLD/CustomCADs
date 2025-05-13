import { Response as Product } from '@/api/catalog/products/gallery/single';
import { CustomizationResponse as Customization } from '@/api/customizations/common';
import GalleryCad from './gallery';
import CreatorCad from './creator';
import EditorCad from './editor';
import CartCad from './cart';

type CadProps =
	| { type: 'gallery'; product: Product }
	| { type: 'creator'; product: Product }
	| { type: 'editor'; id: string }
	| {
			type: 'cart';
			cartId: string;
			productId: string;
			customization?: Customization;
			forDelivery: boolean;
	  };

const Cad = (props: CadProps) => {
	switch (props.type) {
		case 'gallery':
			return <GalleryCad product={props.product} />;
		case 'creator':
			return <CreatorCad product={props.product} />;
		case 'editor':
			return <EditorCad id={props.id} />;
		case 'cart':
			return (
				<CartCad
					id={props.cartId}
					productId={props.productId}
					customization={props.customization}
					forDelivery={props.forDelivery}
				/>
			);
		default:
			return <></>;
	}
};

export default Cad;
