import { Link } from '@tanstack/react-router';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import Password from '@/app/components/fields/password';
import Checkbox from '@/app/components/fields/checkbox';
import { useForm } from './useForm';

export const useFields = () => {
	const { form, error, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const fields = {
		Username: (
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
		),
		Password: (
			<form.Field name='password'>
				{(api) => (
					<>
						<Password
							api={api}
							label={tLabels('password')}
							placeholder={tPlaceholders('password')}
						/>
						<Link
							to='/forgot-password'
							className='self-start ml-2 text-white text-sm transition-colors duration-300 hover:text-purple-300/60'
						>
							{tLabels('forgot-password')}
						</Link>
					</>
				)}
			</form.Field>
		),
		RememberMe: (
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
		),
	};

	return { handleSubmit, fields, error };
};
