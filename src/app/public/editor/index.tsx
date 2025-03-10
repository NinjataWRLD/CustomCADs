import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetStore, setCustomizationId } from '@/stores/editor-store';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import useCustomizationManager from '@/hooks/useCustomizationManager';
import useEditorStore from '@/hooks/stores/useEditorStore';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
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
	const navigate = useNavigate();

	const locationState = useLocation().state;
	if (!locationState || !locationState.allow)
		throw new Error('Entry Not Allowed!');

	const tEditor = useEditorTranslation();

	const { data: product } = useGetProduct({ id: id ?? '' }, !!id);
	const store = useEditorStore(id ?? '');
	const { customization, edit: persist } = useCustomizationManager(
		store.customizationId,
	);

	if (!id || !customization || !product) return;
	if (!store.customizationId) {
		setCustomizationId(id, customization.id);
	}

	const reset = () => resetStore(id);
	const save = () =>
		persist({
			id: customization.id,
			color: store.color,
			materialId: store.materialId,
			infill: store.infill / 100,
			scale: store.scale / 100,
			volume: product.volume,
		});

	const back = () => navigate(`/gallery/${id}`);
	const next = () => navigate(`/cart`);

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
							text={tEditor('back')}
							onClick={back}
						/>
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
						<Btn
							type='button'
							text={tEditor('next')}
							onClick={next}
						/>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Editor;
