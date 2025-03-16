import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Password from '@/app/components/fields/password';
import { useForm } from './useForm';

export const useFields = (email: string, token: string) => {
	const { form, handleSubmit } = useForm(email, token);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const PasswordField = (
		<form.Field name='password'>
			{(field) => (
				<Password
					api={field}
					label={tLabels('password')}
					placeholder={tPlaceholders('password')}
				/>
			)}
		</form.Field>
	);
	const ConfirmPasswordField = (
		<form.Field name='confirmPassword'>
			{(field) => (
				<Password
					api={field}
					label={tLabels('confirm-password')}
					placeholder={tPlaceholders('confirm-password')}
				/>
			)}
		</form.Field>
	);

	return {
		handleSubmit,
		PasswordField,
		ConfirmPasswordField,
	};
};
