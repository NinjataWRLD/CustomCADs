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
import Loader from '@/app/components/state/loading';
import * as calculate3D from '@/utils/calculate-3D';
import Menu from './menu';
import Looks from './menu/looks';
import Calculations from './menu/calculations';

const Editor = () => {
	const navigate = useNavigate();
	const { product } = Route.useLoaderData();

	const tEditor = useEditorTranslation();
	const store = useEditorStore(product.id);

	const { item, customization } = useCartItemManager(product.id);
	const { addItem, toggleItemForDelivery } = useCartUpdates();
	const { mutateAsync: editCustomization } = useEditCustomization();

	if (!customization) return <Loader />;

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
			<div className='h-screen relative flex justify-between'>
				<div className='w-[25%] p-5 bg-[hsla(228,21%,14%,0.77)] rounded-lg shadow-md flex flex-col justify-center gap-2.5 overflow-y-auto border-r-2 border-r-purple-500/60'>
					<div>
						<Menu
							title={tEditor('title-1')}
							description={tEditor('description-1')}
						>
							<Looks id={product.id} />
						</Menu>
					</div>

					<div className='w-full flex justify-center gap-12 mt-8'>
						<Button
							type='button'
							text={tEditor('reset')}
							onClick={reset}
						/>
					</div>
				</div>
				<div className='flex-1'>
					<Cad type='editor' id={product.id} />
				</div>
				<div className='w-[25%] p-5 bg-[hsla(228,21%,14%,0.77)] rounded-lg shadow-md flex flex-col justify-center gap-2.5 overflow-y-auto border-l-2 border-l-purple-500/60'>
					<div>
						<Menu
							title={tEditor('title-2')}
							description={tEditor('description-2')}
						>
							<Calculations id={product.id} volume={volume} />
						</Menu>
					</div>

					<div className='w-full flex justify-center gap-12 mt-8'>
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
