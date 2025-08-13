import { ReactNode, useState } from 'react';

type MenuProps = {
	title: string;
	description: string;
	children: ReactNode;
};

const Menu = ({ title, description, children }: MenuProps) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((prev) => !prev);

	return (
		<div>
			<div
				onClick={toggleOpen}
				className='border border-gray-300 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm cursor-pointer mb-1 hover:bg-gray-100 transition-colors duration-300'
			>
				<div>
					<h4 className='m-0 text-lg font-bold'>{title}</h4>
					<p className='mt-1 mb-0 text-gray-500 text-sm'>
						{description}
					</p>
				</div>
				<span className='text-2xl text-gray-500 hover:text-gray-700 transition-transform duration-300'>
					{open ? '-' : '+'}
				</span>
			</div>
			{open && <div className='rounded-b-lg'>{children}</div>}
		</div>
	);
};

export default Menu;
