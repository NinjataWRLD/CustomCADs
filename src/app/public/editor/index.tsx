import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/_public/editor.$id';
import { resetStore } from '@/stores/editor-store';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import { useCartItemManager } from '@/hooks/useCartItemManager';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useEditCustomization } from '@/hooks/mutations/customizations';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import Cad from '@/app/components/cad';
import * as calculate3D from '@/utils/calculate-3D';
import Menu from './menu';
import Looks from './menu/looks';
import Calculations from './menu/calculations';
import styles from './styles.module.css';

const Editor = () => {
	const navigate = useNavigate();

	const { product } = Route.useLoaderData();
	const isPrintable = product.tags.includes('Printable');

	const tEditor = useEditorTranslation();
	const store = useEditorStore(product.id);

	const { item, customization } = useCartItemManager(product.id);
	const { addItem, toggleItemForDelivery } = useCartUpdates();
	const { mutateAsync: editCustomization } = useEditCustomization();

	if (!customization) return;
	if (!isPrintable) throw new Error('Unprintable CAD!');

	const volume = calculate3D.volumeMm3(
		product.volume,
		store.scale,
		store.size,
	);

	const reset = () => resetStore(product.id);
	const save = () => {
		if (!item)
			addItem({
				productId: product.id,
				quantity: 1,
				forDelivery: true,
				customizationId: customization.id,
			});
		else if (!item.forDelivery)
			toggleItemForDelivery(product.id, customization.id);

		editCustomization({
			id: customization.id,
			color: store.color,
			materialId: store.materialId,
			infill: store.infill,
			scale: store.scale,
			volume: volume,
		});

		navigate({ to: '/cart' });
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
							<Looks id={product.id} />
						</Menu>
					</div>

					<div className={styles.btn}>
						<Button
							type='button'
							text={tEditor('reset')}
							onClick={reset}
						/>
					</div>
				</div>
				<div className={styles.cad}>
					<Cad type='editor' id={product.id} />
				</div>
				<div className={`${styles['material-section']} ${styles.idk2}`}>
					<div>
						<Menu
							title={tEditor('title-2')}
							description={tEditor('description-2')}
						>
							<Calculations id={product.id} volume={volume} />
						</Menu>
					</div>

					<div className={styles.btn}>
						<Button
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
