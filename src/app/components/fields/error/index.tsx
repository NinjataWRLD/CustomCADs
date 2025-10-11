type FormErrorProps = { error?: string };
const FormError = ({ error }: FormErrorProps) => {
	return (
		<div className='relative w-full flex justify-center'>
			{error && (
				<small className='text-red-500 text-[1rem] mt-1 whitespace-nowrap'>
					{error}
				</small>
			)}
		</div>
	);
};

export default FormError;
