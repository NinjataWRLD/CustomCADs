import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import Password from '@/app/components/fields/password';
import { useForm } from './useForm';

export const useFields = (role: 'Client' | 'Contributor') => {
	const { form, handleSubmit } = useForm(role);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const FirstNameField = (
		<form.Field name='firstName'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('first-name')}
					placeholder={tPlaceholders('first-name')}
					type='text'
				/>
			)}
		</form.Field>
	);
	const LastNameField = (
		<form.Field name='lastName'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('last-name')}
					placeholder={tPlaceholders('last-name')}
					type='text'
				/>
			)}
		</form.Field>
	);
	const UsernameField = (
		<form.Field name='username'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('username')}
					placeholder={tPlaceholders('username')}
					type='text'
				/>
			)}
		</form.Field>
	);
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
	const PasswordField = (
		<form.Field name='password'>
			{(api) => (
				<Password
					api={api}
					label={tLabels('password')}
					placeholder={tPlaceholders('password')}
				/>
			)}
		</form.Field>
	);
	const ConfirmPasswordField = (
		<form.Field name='confirmPassword'>
			{(api) => (
				<Password
					api={api}
					label={tLabels('confirm-password')}
					placeholder={tPlaceholders('confirm-password')}
				/>
			)}
		</form.Field>
	);

	return {
		handleSubmit,
		FirstNameField,
		LastNameField,
		UsernameField,
		EmailField,
		PasswordField,
		ConfirmPasswordField,
	};
};
