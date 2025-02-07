import { FormEvent } from 'react';
import { useForm, ValidationError } from '@tanstack/react-form';
import { Request } from '@/api/identity/sign-up/resources/register';
import useRegister from '@/hooks/mutations/sign-up/useRegister';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info/info';
import Password from '@/app/components/fields/password/password';
import styles from '@/styles/forms.module.css';

const useRegisterForm = (role: 'Client' | 'Contributor') => {
	const mutation = useRegister();
	const form = useForm<Request>({
		defaultValues: {
			username: '',
			role: '',
			email: '',
			timeZone: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
		},
		onSubmit: async ({ value }) => {
			const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
			const req: Request = {
				...value,
				role: role,
				timeZone: timeZone,
			};
			mutation.mutateAsync(req);
		},
	});
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	const getClass = (errors: ValidationError[]) =>
		errors ? styles.invalid : '';

	const FirstNameField = (
		<form.Field
			name='firstName'
			children={(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('first-name')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('first-name')}
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		/>
	);
	const LastNameField = (
		<form.Field
			name='lastName'
			children={(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('last-name')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('last-name')}
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		/>
	);
	const UsernameField = (
		<form.Field
			name='username'
			children={(field) =>
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
		/>
	);
	const EmailField = (
		<form.Field
			name='email'
			children={(field) =>
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
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		/>
	);
	const PasswordField = (
		<form.Field
			name='password'
			children={(field) =>
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
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		/>
	);
	const ConfirmPasswordField = (
		<form.Field
			name='confirmPassword'
			children={(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('confirm-password')}</label>
						<div className={styles['password-wrapper']}>
							<Password
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder={tPlaceholders('confirm-password')}
								errors={field.state.meta.errors}
							/>
						</div>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		/>
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

export default useRegisterForm;
