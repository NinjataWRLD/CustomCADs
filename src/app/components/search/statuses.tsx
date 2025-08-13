import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseQueryResult } from '@tanstack/react-query';
import Loader from '@/app/components/state/loading';
import ErrorPage from '@/app/components/state/error';

type StatusesProps = {
	fetch: UseQueryResult<string[], Error>;
	getStatus: () => string | undefined;
	updateStatus: (status?: string) => void;
	isActive: boolean;
	setActive: (active: boolean) => void;
};

const Statuses = ({
	fetch,
	getStatus,
	updateStatus,
	isActive,
	setActive,
}: StatusesProps) => {
	const { data: statuses, isLoading, isError } = fetch;

	const statusParam = getStatus();

	const all = 'No Status chosen';
	const [status, setStatus] = useState(statusParam ?? all);

	useEffect(() => {
		if (statuses) updateStatus(statusParam);
	}, [statuses, statusParam]);

	useEffect(() => {
		if (!statusParam) {
			setStatus(all);
		}
	}, [all, statusParam]);

	if (isLoading) {
		return <Loader />;
	}

	if (isError || !statuses) {
		return <ErrorPage status={400} />;
	}

	const toggleDropdown = () => {
		setActive(!isActive);
	};

	const handleInput = (status: string) => {
		if (status === all) {
			setStatus(all);
			updateStatus();
		} else if (status) {
			setStatus(status);
			updateStatus(status);
		}

		setActive(false);
	};

	return (
		<div className='relative w-1/5 z-50'>
			<div
				className={`relative flex justify-between items-center p-5 bg-black text-white border-2 border-purple-900/75 rounded-2xl shadow-md shadow-purple-900/20 cursor-pointer ${
					isActive ? 'active' : ''
				}`}
				onClick={toggleDropdown}
			>
				<span className='ml-[5%] text-base font-normal drop-shadow-[1px_1px_2px_white,_2px_2px_1px_rgb(128,0,128)]'>
					{status}
				</span>
				<FontAwesomeIcon
					icon={faChevronDown}
					className={`text-sm mr-2.5 transition-transform duration-1000 ${isActive ? 'rotate-180' : ''}`}
				/>
			</div>

			<ul className='absolute w-[90%] right-[7%] -translate-y-1.5'>
				<li
					className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
						isActive
							? 'opacity-100 scale-100 translate-y-0 mb-0'
							: 'opacity-0 scale-0 -translate-y-16 -mb-10'
					}`}
					style={{ transitionDelay: `0s` }}
					onClick={() => handleInput(all)}
				>
					<span className='text-lg text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium w-full px-2'>
						{all}
					</span>
				</li>

				{statuses.map((status, index) => (
					<li
						key={status}
						value={status}
						className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
							isActive
								? 'opacity-100 scale-100 translate-y-0 mb-0'
								: 'opacity-0 scale-0 -translate-y-16 -mb-10'
						}`}
						style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
						onClick={() => handleInput(status)}
					>
						<span className='text-lg text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium w-full px-2'>
							{status}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Statuses;
