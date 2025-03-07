import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import useGetCategories from '@/hooks/queries/categories/useGetCategories';
import FieldInfo from '@/app/components/fields/info';
import getErrorClass from '@/utils/get-error-class';
import useForm from './useForm';

const useFields = () => {
	const { form, handleSubmit, ref } = useForm();
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
							onChange={(e) =>
								field.handleChange(e.target.files?.[0] ?? null)
							}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
							onChange={(e) =>
								field.handleChange(e.target.files?.[0] ?? null)
							}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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

export default useFields;
