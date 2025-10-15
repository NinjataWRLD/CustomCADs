import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import { useGetCategories } from '@/hooks/queries/categories';
import { useCurrencyStore } from '@/hooks/stores/useCurrencyStore';
import Field from '@/app/components/fields';
import FileField from '@/app/components/fields/file';
import * as money from '@/utils/money';
import { doFieldsHaveErrors } from '@/utils/form';
import { useForm } from './useForm';

export const useFields = (options?: {
	onUpload: { cad?: VoidFunction; image?: VoidFunction };
}) => {
	const {
		form,
		handleSubmit,
		setCad,
		setImage,
		ref,
		cadRenderProgress,
		error,
	} = useForm();
	const { data: categories } = useGetCategories();

	const { current: currency } = useCurrencyStore();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const fields = {
		Name: (
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
		),
		Description: (
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
		),
		Category: (
			<form.Field name='categoryId'>
				{(api) => (
					<Field
						tag='select'
						api={api}
						label={tLabels('category')}
						format={(value) => Number(value)}
						options={categories?.map((c) => ({
							id: c.id,
							name: c.name,
							value: String(c.id),
						}))}
					/>
				)}
			</form.Field>
		),
		Price: (
			<form.Field name='price'>
				{(api) => (
					<Field
						tag='input'
						api={api}
						label={`${tLabels('price')} (${money.currencyToSymbol(currency)})`}
						type='number'
						format={(value) => Number(value)}
					/>
				)}
			</form.Field>
		),
		Image: (
			<form.Field
				name='image'
				listeners={{
					onChange: ({ value: image }) => {
						setImage(image);
						if (image) {
							options?.onUpload.image?.();
						}
					},
				}}
			>
				{(api) => (
					<FileField
						api={api}
						label={tLabels('image')}
						accept='.png,.jpg,.jpeg,.webp'
					/>
				)}
			</form.Field>
		),
		Cad: (
			<form.Field
				name='cad'
				listeners={{
					onChange: ({ value: cad }) => {
						setCad(cad);
						if (cad) {
							options?.onUpload.cad?.();
						}
					},
				}}
			>
				{(api) => (
					<FileField
						api={api}
						label={tLabels('cad')}
						accept='.glb,.stl'
					/>
				)}
			</form.Field>
		),
	};

	const { evaluateFields } = doFieldsHaveErrors<
		typeof form.store.state.values
	>(
		(field) => form.getAllErrors().fields[field],
		(field) =>
			form.setFieldMeta(field, (field) => ({
				...field,
				isBlurred: true,
				isTouched: true,
			})),
	);

	return {
		ref,
		files: {
			cad: !!form.getFieldValue('cad')
				? URL.createObjectURL(form.getFieldValue('cad')!)
				: undefined,
			image: !!form.getFieldValue('image')
				? URL.createObjectURL(form.getFieldValue('image')!)
				: undefined,
		},
		validate: {
			metadata: () =>
				!evaluateFields(['name', 'categoryId', 'price', 'description']),
			files: () => !evaluateFields(['image', 'cad']),
		},
		handleSubmit,
		cadRenderProgress,
		fields,
		error,
	};
};
