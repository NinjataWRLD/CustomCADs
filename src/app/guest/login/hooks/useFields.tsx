import { Link } from 'react-router-dom';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import Password from '@/app/components/fields/password';
import Checkbox from '@/app/components/fields/checkbox';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

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
	const PasswordField = (
		<form.Field name='password'>
			{(api) => (
				<>
					<Password
						api={api}
						label={tLabels('password')}
						placeholder={tPlaceholders('password')}
					/>
					<Link to='/forgot-password'>
						{tLabels('forgot-password')}
					</Link>
				</>
			)}
		</form.Field>
	);
	const RememberMeField = (
		<form.Field name='rememberMe'>
			{(field) => (
				<Field
					tag='custom'
					api={field}
					label=''
					field={
						<Checkbox
							id={field.name}
							label={tLabels('remember-me')}
							checked={field.state.value}
							onClick={(e) =>
								field.handleChange(e.target.checked)
							}
							style={{ marginRight: 120 }}
						/>
					}
				/>
			)}
		</form.Field>
	);

	return {
		handleSubmit,
		UsernameField,
		PasswordField,
		RememberMeField,
	};
};
