import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { resetStore, setCustomizationId } from '@/stores/editor-store';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import useCustomizationManager from '@/hooks/useCustomizationManager';
import useEditorStore from '@/hooks/stores/useEditorStore';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import useCartContext from '@/hooks/contexts/useCartContext';
import useCartUpdates from '@/hooks/contexts/useCartUpdates';
import Transition from '@/app/components/transition';
import Btn from '@/app/components/button';
import Cad from '@/app/components/cad';
import calculate3D from '@/utils/calculate-3D';
import Menu from './menu';
import Looks from './menu/looks';
import Calculations from './menu/calculations';
import styles from './styles.module.css';

const Editor = () => {
	const { id } = useParams();
	const locationState = useLocation().state;
	if (!locationState || !locationState.allow)
		throw new Error('Entry Not Allowed!');

	const { items } = useCartContext();
	const item = items.find((i) => i.productId === id);

	const tEditor = useEditorTranslation();
	const store = useEditorStore(id ?? '');

	const { data: product } = useGetProduct({ id: id ?? '' }, !!id);
	const { customization, edit: editCustomization } = useCustomizationManager(
		store.customizationId,
	);

	const { addItem, toggleItemForDelivery } = useCartUpdates();
	useEffect(() => {
		if (id && customization && item) {
			if (!item.forDelivery) toggleItemForDelivery(id, customization.id);
		}
	}, [id, customization, item]);

	if (!id || !customization || !product) return;
	if (!store.customizationId) {
		setCustomizationId(id, customization.id);
	}

	const reset = () => resetStore(id);
	const save = () => {
		if (!item)
			addItem({
				productId: id,
				quantity: 1,
				forDelivery: true,
				customizationId: customization.id,
			});

		editCustomization({
			id: customization.id,
			color: store.color,
			materialId: store.materialId,
			infill: store.infill / 100,
			scale: store.scale / 100,
			volume: product.volume,
		});
	};

	const volume = calculate3D.volumeMm3(
		product.volume,
		store.scale / 100,
		store.size,
	);

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
