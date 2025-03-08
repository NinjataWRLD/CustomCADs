import useGetMaterials from '@/hooks/queries/materials/useGetMaterials';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import { useOthersTranslation } from '@/hooks/locales/common/others';
import useEditorStore from '@/hooks/stores/useEditorStore';
import { setColor, setMaterialId } from '@/stores/editor-store';
import styles from '../styles.module.css';

interface LooksProps {
	id: string;
}

const Looks = ({ id }: LooksProps) => {
	const { data: materials } = useGetMaterials();
	const { materialId, color } = useEditorStore(id);

	const tOthers = useOthersTranslation();
	const tEditor = useEditorTranslation();

	if (!materials) return;
	return (
		<div className={`${styles.expanded} ${styles.fade}`}>
			{materials.map(({ id: mId, name: mName, density: mDensity }) => (
				<div
					key={mId}
					onClick={() => setMaterialId(id, mId)}
					className={`${styles.fade} ${styles['sub-material']} ${styles['material-option']} ${materialId === mId ? styles['material-option-active'] : ''}`}
				>
					{mName} - {`${mDensity}g/cm³`}
				</div>
			))}
			<br />
			<label htmlFor='color'>{tOthers('color')}:</label>
			<input
				id='color'
				type='color'
				value={color}
				onChange={(e) => setColor(id, e.target.value)}
			/>
			{color !== '#ffffff' && (
				<button onClick={() => setColor(id, '#ffffff')}>
					{tEditor('clear-color')}
				</button>
			)}
		</div>
	);
};

export default Looks;
