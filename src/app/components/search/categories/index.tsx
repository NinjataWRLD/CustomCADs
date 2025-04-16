import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryResponse } from '@/api/categories/common';
import { useGetCategories } from '@/hooks/queries/categories';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import styles from '../styles.module.css';

interface CategoriesProps {
	getCategory: () => string | undefined;
	updateCategory: (category?: CategoryResponse) => void;
}

const Categories = ({ getCategory, updateCategory }: CategoriesProps) => {
	const tFetch = useFetchTranslation();

	const { data: categories, isLoading, isError } = useGetCategories();
	const [isActiveCategory, setIsActiveCategory] = useState(false);

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
		return <>{tFetch('loading')}</>;
	}

	if (isError || !categories) {
		return <>{tFetch('error')}</>;
	}

	const toggleDropdown = () => {
		setIsActiveCategory((prev) => !prev);
	};

	const handleInput = (name: string) => {
		const category = categories.find((c) => c.name === name);

		setIsActiveCategory(false);
		if (category) {
			setCategory(category.name);
			updateCategory(category);
		} else {
			setCategory(all);
			updateCategory();
		}
	};

	return (
		<div className={`${styles.menu}`}>
			<div
				className={`${styles['select-btn']} ${isActiveCategory ? styles.active : ''}`}
				onClick={toggleDropdown}
			>
				<span className={`${styles.category}`}>{category}</span>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>
			<ul className={`${styles.list}`}>
				<li
					className={`${styles.option}`}
					style={
						{
							'--i': 0,
						} as React.CSSProperties
					}
					onClick={() => handleInput(all)}
				>
					<span className={`${styles.name}`}>{all}</span>
				</li>
				{categories.map((category) => (
					<li
						key={category.id}
						value={category.id}
						className={`${styles.option}`}
						style={
							{
								'--i': category.id + 1,
							} as React.CSSProperties
						}
						onClick={() => handleInput(category.name)}
					>
						<span className={`${styles.name}`}>
							{category.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
