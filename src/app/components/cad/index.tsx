import { Coordinates } from '@/api/catalog/common.js';
import GalleryCad from './gallery';
import CreatorCad from './creator';
import EditorCad from './editor';

export type Product = {
	id: string;
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
};

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
