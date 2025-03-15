import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetStore } from '@/stores/editor-store';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import { useCartItemManager } from '@/hooks/useCartItemManager';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { useGetProduct } from '@/hooks/queries/products/gallery';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useEditCustomization } from '@/hooks/mutations/customizations';
import Transition from '@/app/components/transition';
import Btn from '@/app/components/button';
import Cad from '@/app/components/cad';
import * as calculate3D from '@/utils/calculate-3D';
import Menu from './menu';
import Looks from './menu/looks';
import Calculations from './menu/calculations';
import styles from './styles.module.css';

const Editor = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const locationState = useLocation().state;
	if (!locationState || !locationState.allow)
		throw new Error('Entry Not Allowed!');

	const tEditor = useEditorTranslation();
	const store = useEditorStore(id ?? '');

	const { data: product } = useGetProduct({ id: id ?? '' }, !!id);
	const { item, customization } = useCartItemManager(id ?? '');

	const { addItem, toggleItemForDelivery } = useCartUpdates();
	const { mutateAsync: editCustomization } = useEditCustomization();

	if (!id || !customization || !product) return;

	const volume = calculate3D.volumeMm3(
		product.volume,
		store.scale / 100,
		store.size,
	);

	const reset = () => resetStore(id);
	const save = () => {
		if (!item)
			addItem({
				productId: id,
				quantity: 1,
				forDelivery: true,
				customizationId: customization.id,
			});
		else if (!item.forDelivery) toggleItemForDelivery(id, customization.id);

		editCustomization({
			id: customization.id,
			color: store.color,
			materialId: store.materialId,
			infill: store.infill / 100,
			scale: store.scale / 100,
			volume: volume,
		});

		navigate('/cart');
	};

	return (
		<Transition>
			<div className={styles['viewer-page']}>
				<div className={`${styles['material-section']} ${styles.idk1}`}>
					<div>
						<Menu
							title={tEditor('title-1')}
							description={tEditor('description-1')}
						>
							<Looks id={id} />
						</Menu>
					</div>

					<div className={styles.btn}>
						<Btn
							type='button'
							text={tEditor('reset')}
							onClick={reset}
						/>
					</div>
				</div>
				<div className={styles.cad}>
					<Cad type='editor' id={String(id)} />
				</div>
				<div className={`${styles['material-section']} ${styles.idk2}`}>
					<div>
						<Menu
							title={tEditor('title-2')}
							description={tEditor('description-2')}
						>
							<Calculations id={id} volume={volume} />
						</Menu>
					</div>

					<div className={styles.btn}>
						<Btn
							type='button'
							text={tEditor('save')}
							onClick={save}
						/>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Editor;
