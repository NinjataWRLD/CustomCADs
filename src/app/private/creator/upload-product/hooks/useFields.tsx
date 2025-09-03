import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import { useGetCategories } from '@/hooks/queries/categories';
import { useCurrencyStore } from '@/hooks/stores/useCurrencyStore';
import Field from '@/app/components/fields';
import FileField from '@/app/components/fields/file';
import * as money from '@/utils/money';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, handleSubmit, setCad, cadSet, ref } = useForm();
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
			<form.Field name='image'>
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
		),
	};

	return { ref, cadSet, handleSubmit, fields };
};
