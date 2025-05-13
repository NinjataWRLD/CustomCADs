import { useEffect } from 'react';
import { useShipmentFormTranslation } from '@/hooks/locales/pages/customer';
import Transition from '@/app/components/transition';
import Border from '@/app/components/border';
import Button from '@/app/components/button';
import { useFields } from './hooks/useFields';
import { Fields } from './hooks/useForm';

interface ShipmentFormProps {
	onSubmit: (values: Fields) => void;
	requireCount?: boolean;
}
const ShipmentForm = ({ onSubmit, requireCount }: ShipmentFormProps) => {
	const { handleSubmit, ...fields } = useFields(onSubmit);
	const tShipmentForm = useShipmentFormTranslation();

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
		  .form-hover-heading:hover h1 {
			color: rgba(255, 255, 255, 0.9);
			text-shadow:
			  0 0 10px rgba(138, 43, 226, 0.8),
			  0 0 20px rgba(138, 43, 226, 0.6),
			  0 0 30px rgba(186, 85, 211, 0.7),
			  0 0 40px rgba(186, 85, 211, 0.5);
			transition: text-shadow 0.3s linear;
		  }
		`;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<form
				onSubmit={handleSubmit}
				className='h-[100dvh] flex flex-col justify-center items-center text-white'
			>
				<div className='form-hover-heading relative flex flex-col justify-center items-center w-2/5 px-30 py-15 gap-8 mt-10'>
					<Border />
					<h1 className='m-0'>{tShipmentForm(`title`)}</h1>

					<div className='w-full flex flex-row gap-10'>
						<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
							{fields.CountryField}
						</div>

						<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
							{fields.CityField}
						</div>
					</div>

					<div className='w-full flex flex-row gap-10'>
						<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
							{fields.StreetField}
						</div>

						<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
							{fields.PhoneField}
						</div>
					</div>

					<div className='w-[105%] flex flex-col items-center gap-[10px] mt-[10px] ml-[20px]'>
						{fields.ServiceField}
					</div>

					<div className='w-full flex flex-row gap-10'>
						<div className='flex grow flex-col items-center gap-[10px] mt-[10px]'>
							{fields.EmailField}
						</div>
						{requireCount && (
							<div className='w-[20%] flex flex-col items-center gap-[10px] mt-[10px]'>
								{fields.CountField}
							</div>
						)}
					</div>

					<div>
						<Button type='submit' text={tShipmentForm('btn')} />
					</div>
				</div>
			</form>
		</Transition>
	);
};

export default ShipmentForm;
