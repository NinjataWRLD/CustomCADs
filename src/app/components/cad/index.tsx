import { Response as Product } from '@/api/catalog/products/gallery/single';
import { CustomizationResponse as Customization } from '@/api/printing/common';
import GalleryCad from './gallery';
import CreatorCad from './creator';
import EditorCad from './editor';
import CartCad from './cart';

type GalleryCadProps = { type: 'gallery'; product: Product };
type CreatorCadProps = { type: 'creator'; product: Product };
type EditorCadProps = { type: 'editor'; id: string };
type CartCadProps = { type: 'cart'; cartId: string; productId: string } & (
	| { forDelivery: false }
	| { forDelivery: true; customization: Customization }
);

type CadProps =
	| GalleryCadProps
	| CreatorCadProps
	| EditorCadProps
	| CartCadProps;

const Cad = (props: CadProps) => {
	switch (props.type) {
		case 'gallery':
			return <GalleryCad product={props.product} />;
		case 'creator':
			return <CreatorCad product={props.product} />;
		case 'editor':
			return <EditorCad id={props.id} />;
		case 'cart':
			return props.forDelivery ? (
				<CartCad
					id={props.cartId}
					productId={props.productId}
					forDelivery={props.forDelivery}
					customization={props.customization}
				/>
			) : (
				<CartCad
					id={props.cartId}
					productId={props.productId}
					forDelivery={props.forDelivery}
				/>
			);
		default:
	}
};

export default Cad;
