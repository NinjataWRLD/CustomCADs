import { useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortingDirection } from '@/types/sorting';
import Loader from '@/app/components/state/loading';
import ErrorPage from '@/app/components/state/error';

interface SortingsProps {
	getSorting: () => { type?: string; direction?: string };
	updateSorting: (sorting: { type?: string; direction?: string }) => void;
	fetch: UseQueryResult<string[], Error>;
	isActive: boolean;
	setActive: (active: boolean) => void;
}

const Sortings = ({
	getSorting,
	updateSorting,
	isActive,
	setActive,
	fetch,
}: SortingsProps) => {
	const { data: sortings, isLoading, isError } = fetch;

	const { type: sortingParam, direction: directionParam } = getSorting();
	const initial = 'Sort By';

	const [sorting, setSorting] = useState<string>(sortingParam ?? initial);
	const [direction, setDirection] = useState<SortingDirection>(
		directionParam
			? SortingDirection[directionParam as keyof typeof SortingDirection]
			: SortingDirection.Descending,
	);

	useEffect(() => {
		if (!sortingParam) {
			setSorting(initial);
		}
	}, [initial, sortingParam]);

	useEffect(() => {
		updateSorting({
			type: sortingParam,
			direction: directionParam,
		});
	}, [sortingParam]);

	const toggleDropdown = () => {
		setActive(!isActive);
	};

	const toggleDirection = () => {
		if (sorting !== initial) {
			setDirection((prev) => {
				const set = (direction: SortingDirection) => {
					updateSorting({ direction: SortingDirection[direction] });
					return direction;
				};
				switch (prev) {
					case SortingDirection.Ascending:
						return set(SortingDirection.Descending);
					case SortingDirection.Descending:
					default:
						return set(SortingDirection.Ascending);
				}
			});
		}
	};

	const handleInput = (name: string) => {
		setSorting(() => name);
		updateSorting({ type: name });
		setActive(false);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (isError || !sortings) {
		return <ErrorPage status={400} />;
	}

	return (
		<>
			<div className='relative w-1/5 z-50'>
				<div
					className={`relative flex justify-between items-center p-5 bg-black text-white border-2 border-purple-900/75 rounded-2xl shadow-md shadow-purple-900/20 cursor-pointer ${
						isActive ? 'active' : ''
					}`}
					onClick={toggleDropdown}
				>
					<span className='ml-[5%] text-base font-normal drop-shadow-[1px_1px_2px_white,_2px_2px_1px_rgb(128,0,128)]'>
						{sorting}
					</span>
					<FontAwesomeIcon
						icon={faChevronDown}
						className={`text-sm mr-2.5 transition-transform duration-1000 ${isActive ? 'rotate-180' : ''}`}
					/>
				</div>

				{sortings && (
					<ul className='absolute w-[90%] right-[7%] -translate-y-1.5'>
						{sortings.map((sortingOption, index) => (
							<li
								key={sortingOption}
								value={sortingOption}
								className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
									isActive
										? 'opacity-100 scale-100 translate-y-0 mb-0'
										: 'opacity-0 scale-0 -translate-y-16 -mb-10'
								}`}
								style={{ transitionDelay: `${index * 0.1}s` }}
								onClick={() => handleInput(sortingOption)}
							>
								<span className='text-lg text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium w-full px-2'>
									{sortingOption}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<div
				className='w-[5%] h-16 rounded-2xl bg-black text-white border-2 border-purple-900/75 flex justify-center items-center cursor-pointer'
				onClick={() => {
					if (sorting !== initial) {
						toggleDirection();
					}
				}}
			>
				<div
					className={`relative inline-block text-center ${sorting === initial ? 'cursor-not-allowed' : ''}`}
					data-tooltip={
						!sorting ? 'Select Sorting' : direction.toString()
					}
				>
					<FontAwesomeIcon
						icon={
							direction === SortingDirection.Ascending
								? faArrowUp
								: faArrowDown
						}
						className={`text-xl text-purple-800 transition-colors duration-400 ${
							sorting === initial
								? 'text-gray-500 opacity-50'
								: ''
						}`}
					/>
				</div>
			</div>
		</>
	);
};

export default Sortings;
