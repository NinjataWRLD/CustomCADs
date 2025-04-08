import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import { useGetCategories } from '@/hooks/queries/categories';
import Field from '@/app/components/fields';
import FileField from '@/app/components/fields/file';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, handleSubmit, setCad, cadSet, ref } = useForm();
	const { data: categories } = useGetCategories();

	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const NameField = (
		<form.Field name='name'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('name')}
					placeholder={tPlaceholders('name')}
					type='text'
				/>
			)}
		</form.Field>
	);
	const DescriptionField = (
		<form.Field name='description'>
			{(api) => (
				<Field
					tag='textarea'
					api={api}
					label={tLabels('description')}
					placeholder={tLabels('description')}
				/>
			)}
		</form.Field>
	);
	const CategoryField = (
		<form.Field name='categoryId'>
			{(api) => (
				<Field
					tag='select'
					api={api}
					label={tLabels('category')}
					format={(value) => Number(value)}
					options={categories?.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				/>
			)}
		</form.Field>
	);
	const PriceField = (
		<form.Field name='price'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('price')}
					type='number'
					format={(value) => Number(value)}
				/>
			)}
		</form.Field>
	);
	const ImageField = (
		<form.Field name='image'>
			{(api) => (
				<FileField
					api={api}
					label={tLabels('image')}
					accept='.png,.jpg,.jpeg,.webp'
				/>
			)}
		</form.Field>
	);
	const CadField = (
		<form.Field name='cad'>
			{(api) => (
				<FileField
					api={api}
					label={tLabels('cad')}
					accept='.glb,.stl'
					onChange={(e) => setCad(e.target.files?.[0] ?? null)}
				/>
			)}
		</form.Field>
	);

	return {
		ref,
		cadSet,
		handleSubmit,
		NameField,
		DescriptionField,
		CategoryField,
		PriceField,
		ImageField,
		CadField,
	};
};
