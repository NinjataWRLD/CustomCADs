import { Link } from 'react-router-dom';
import { ValidationError } from '@tanstack/react-form';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info';
import Password from '@/app/components/fields/password';
import Checkbox from '@/app/components/fields/checkbox';
import useForm from './useForm';
import styles from '@/styles/forms.module.css';

const useFields = () => {
	const { form, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const getClass = (errors: ValidationError[]) =>
		errors ? styles.invalid : '';
	const UsernameField = (
		<form.Field name='username'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('username')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('username')}
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);
	const PasswordField = (
		<form.Field name='password'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('password')}</label>
						<div className={styles['password-wrapper']}>
							<Password
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder={tPlaceholders('password')}
								errors={field.state.meta.errors}
							/>
						</div>
						<Link to='/forgot-password'>
							{tLabels('forgot-password')}
						</Link>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);
	const RememberMeField = (
		<form.Field name='rememberMe'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<Checkbox
							id={field.name}
							label={tLabels('remember-me')}
							checked={field.state.value}
							onClick={(e) =>
								field.handleChange(e.target.checked)
							}
							style={{ marginRight: 120 }}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);

	return {
		handleSubmit,
		UsernameField,
		PasswordField,
		RememberMeField,
	};
};

export default useFields;
