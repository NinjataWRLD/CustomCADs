import { useState } from 'react';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import Password from '@/app/components/fields/password';
import { useForm } from './useForm';

export const useFields = (role: 'Customer' | 'Contributor') => {
	const { form, handleSubmit, isSuccess } = useForm(role);
	const [username, setUsername] = useState<string | null>(null);

	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const fields = {
		FirstName: (
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
		),
		LastName: (
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
		),
		Username: (
			<form.Field
				name='username'
				listeners={{ onChange: ({ value }) => setUsername(value) }}
			>
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
		),
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
		Password: (
			<form.Field name='password'>
				{(api) => (
					<Password
						api={api}
						label={tLabels('password')}
						placeholder={tPlaceholders('password')}
					/>
				)}
			</form.Field>
		),
		ConfirmPassword: (
			<form.Field name='confirmPassword'>
				{(api) => (
					<Password
						api={api}
						label={tLabels('confirm-password')}
						placeholder={tPlaceholders('confirm-password')}
					/>
				)}
			</form.Field>
		),
	};

	return { handleSubmit, fields, username, isSuccess };
};
