import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, sendEmail, handleSubmit, error } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const fields = {
		Email: (
			<form.Field name='email'>
				{(api) => (
					<Field
						tag='input'
						api={api}
						label={tLabels('email')}
						type='email'
						placeholder={tPlaceholders('email')}
					/>
				)}
			</form.Field>
		),
	};
	return { handleSubmit, sendEmail, fields, error };
};
