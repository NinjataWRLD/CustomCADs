import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, refetch, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const EmailField = (
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
	);

	return {
		handleSubmit,
		resendEmail: refetch,
		EmailField,
	};
};
