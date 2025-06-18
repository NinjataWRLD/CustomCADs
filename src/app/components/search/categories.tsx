import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryResponse } from '@/api/categories/common';
import { useGetCategories } from '@/hooks/queries/categories';
import Loader from '@/app/components/state/loading';
import ErrorPage from '@/app/components/state/error';

interface CategoriesProps {
	getCategory: () => string | undefined;
	updateCategory: (category?: CategoryResponse) => void;
	isActive: boolean;
	setActive: (active: boolean) => void;
}

const Categories = ({
	getCategory,
	updateCategory,
	isActive,
	setActive,
}: CategoriesProps) => {
	const { data: categories, isLoading, isError } = useGetCategories();

	const categoryParam = getCategory();

	const all = 'All Categories';
	const [category, setCategory] = useState(categoryParam ?? all);

	useEffect(() => {
		if (categories) {
			if (categoryParam)
				updateCategory(
					categories.find((c) => c.name === categoryParam),
				);
			else updateCategory();
		}
	}, [categories, categoryParam]);

	useEffect(() => {
		if (!categoryParam) {
			setCategory(all);
		}
	}, [all, categoryParam]);

	if (isLoading) {
		return <Loader />;
	}

	if (isError || !categories) {
		return <ErrorPage status={400} />;
	}

	const toggleDropdown = () => {
		setActive(!isActive);
	};

	const handleInput = (name: string) => {
		const category = categories.find((c) => c.name === name);

		if (category) {
			setCategory(category.name);
			updateCategory(category);
		} else {
			setCategory(all);
			updateCategory();
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
					{category}
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

				{categories.map((category, index) => (
					<li
						key={category.id}
						value={category.id}
						className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
							isActive
								? 'opacity-100 scale-100 translate-y-0 mb-0'
								: 'opacity-0 scale-0 -translate-y-16 -mb-10'
						}`}
						style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
						onClick={() => handleInput(category.name)}
					>
						<span className='text-lg text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium w-full px-2'>
							{category.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
