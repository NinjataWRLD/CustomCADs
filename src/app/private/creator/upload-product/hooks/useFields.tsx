import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import { useGetCategories } from '@/hooks/queries/categories';
import FieldInfo from '@/app/components/fields/info';
import { getErrorClass, formatMeta } from '@/utils/form';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, handleSubmit, setCad, ref } = useForm();
	const { data: categories } = useGetCategories();

	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const NameField = (
		<form.Field name='name'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('name')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('name')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);
	const DescriptionField = (
		<form.Field name='description'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('description')}</label>
						<textarea
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('description')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);
	const CategoryField = (
		<form.Field name='categoryId'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('category')}</label>
						<select
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) =>
								field.handleChange(Number(e.target.value))
							}
							className={getErrorClass(field.state.meta.errors)}
						>
							{categories?.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);
	const PriceField = (
		<form.Field name='price'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('price')}</label>
						<input
							type='number'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) =>
								field.handleChange(e.target.valueAsNumber)
							}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);
	const ImageField = (
		<form.Field name='image'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('image')}</label>
						<input
							type='file'
							accept='.png,.jpg,.jpeg,.webp'
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => {
								const image = e.target.files?.[0] ?? null;
								field.handleChange(image);
							}}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);
	const CadField = (
		<form.Field name='cad'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('cad')}</label>
						<input
							type='file'
							accept='.glb'
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => {
								const cad = e.target.files?.[0] ?? null;
								field.handleChange(cad);
								setCad(cad);
							}}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);

	return {
		ref,
		handleSubmit,
		NameField,
		DescriptionField,
		CategoryField,
		PriceField,
		ImageField,
		CadField,
	};
};
