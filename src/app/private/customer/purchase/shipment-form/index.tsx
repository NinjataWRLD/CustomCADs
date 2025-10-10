import { useShipmentFormTranslation } from '@/hooks/locales/pages/customer';
import Border from '@/app/components/border';
import Button from '@/app/components/button';
import { useFields } from './hooks/useFields';
import { Fields } from './hooks/useForm';

type ShipmentFormProps = {
	onSubmit: (values: Fields) => void;
	requireCount?: boolean;
};
const ShipmentForm = ({ onSubmit, requireCount }: ShipmentFormProps) => {
	const { handleSubmit, fields } = useFields(onSubmit);
	const tShipmentForm = useShipmentFormTranslation();

	return (
		<form
			onSubmit={handleSubmit}
			className='h-[100dvh] flex flex-col justify-center items-center text-white'
		>
			<div className='form-hover-heading relative flex flex-col justify-center items-center w-2/5 px-30 py-15 gap-8 mt-10'>
				<Border />
				<h1 className='m-0'>{tShipmentForm(`title`)}</h1>

				<div className='w-full flex flex-row gap-10'>
					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Country}
					</div>

					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.City}
					</div>
				</div>

				<div className='w-full flex flex-row gap-10'>
					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Street}
					</div>

					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Phone}
					</div>
				</div>

				<div className='w-full flex flex-row gap-10'>
					<div className='flex grow flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Email}
					</div>
					{requireCount && (
						<div className='w-[20%] flex flex-col items-center gap-[10px] mt-[10px]'>
							{fields.Count}
						</div>
					)}
				</div>

				<div className='w-[105%] flex flex-col items-center gap-[10px] mt-[10px] ml-[20px]'>
					{fields.Service}
				</div>

				<div>
					<Button type='submit' text={tShipmentForm('btn')} />
				</div>
			</div>
		</form>
	);
};

export default ShipmentForm;
