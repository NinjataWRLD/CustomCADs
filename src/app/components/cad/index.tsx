import { Response as Product } from '@/api/catalog/products/gallery/single';
import GalleryCad from './gallery';
import CreatorCad from './creator';
import EditorCad from './editor';

type CadProps =
	| { type: 'gallery'; product: Product }
	| { type: 'creator'; product: Product }
	| { type: 'editor'; id: string };

const Cad = (props: CadProps) => {
	switch (props.type) {
		case 'gallery':
			return <GalleryCad product={props.product} />;
		case 'creator':
			return <CreatorCad product={props.product} />;
		case 'editor':
			return <EditorCad id={props.id} />;
		default:
			return <></>;
	}
};

export default Cad;
