import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Password from '@/app/components/fields/password';
import { useForm } from './useForm';

type Props = {
	email: string;
	token: string;
};

export const useFields = ({ email, token }: Props) => {
	const { form, handleSubmit, error } = useForm(email, token);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const fields = {
		Password: (
			<form.Field name='password'>
				{(field) => (
					<Password
						api={field}
						label={tLabels('password')}
						placeholder={tPlaceholders('password')}
					/>
				)}
			</form.Field>
		),
		ConfirmPassword: (
			<form.Field name='confirmPassword'>
				{(field) => (
					<Password
						api={field}
						label={tLabels('confirm-password')}
						placeholder={tPlaceholders('confirm-password')}
					/>
				)}
			</form.Field>
		),
	};

	return { handleSubmit, fields, error };
};
