import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info';
import { getErrorClass, formatMeta } from '@/utils/form';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, refetch, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const EmailField = (
		<form.Field name='email'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('email')}</label>
						<input
							type='email'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('email')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo info={formatMeta(field.state.meta)} />
					</>
				)
			}
		</form.Field>
	);

	return {
		handleSubmit,
		resendEmail: refetch,
		EmailField,
	};
};
