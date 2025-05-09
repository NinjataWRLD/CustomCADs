interface ButtonProps {
	type: 'button' | 'submit';
	text: string;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ text, type, disabled, onClick }: ButtonProps) => {
	switch (type) {
		case 'button':
			return (
				<div
					className='text-center text-white relative inline-block no-underline cursor-pointer'
					onClick={onClick}
				>
					<div className='font-bold bg-[hsla(271,42%,54%,0.358)] backdrop-blur-[10px] no-underline text-inherit relative z-10 px-6 py-3 rounded-[2em] scale-110 transition-transform transition-shadow ease-in-out duration-200 hover:translate-y-2.5 hover:shadow-[-10px_0_50px_hsl(270,30%,40%),10px_0_50px_hsl(250,10%,18%)] active:translate-y-[5px] text-[1.05rem]'>
						{text}
					</div>
					<div className='absolute z-[9] shadow-[5px_0_10px_hsl(270,30%,40%),5px_0_10px_hsl(250,10%,18%)] translate-y-2.5 rounded-[2em] inset-0 bg-custom-gradient'></div>
				</div>
			);
		case 'submit':
			return (
				<button
					type='submit'
					className='text-center text-white relative inline-block no-underline cursor-pointer bg-transparent border-none'
					onClick={onClick}
					disabled={disabled}
				>
					<div className='font-bold bg-[hsla(271,42%,54%,0.358)] backdrop-blur-[10px] no-underline text-inherit relative z-10 px-6 py-3 rounded-[2em] scale-110 transition-transform transition-shadow ease-in-out duration-200 hover:translate-y-2.5 hover:shadow-[-10px_0_50px_hsl(270,30%,40%),10px_0_50px_hsl(250,10%,18%)] active:translate-y-[5px] text-[1.05rem]'>
						{text}
					</div>
					<div className='absolute z-[9] shadow-[5px_0_10px_hsl(270,30%,40%),5px_0_10px_hsl(250,10%,18%)] translate-y-2.5 rounded-[2em] inset-0 bg-custom-gradient'></div>
				</button>
			);
		default:
	}
};

export default Button;
