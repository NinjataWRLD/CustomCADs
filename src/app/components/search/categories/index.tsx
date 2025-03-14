import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGetCategories from '@/hooks/queries/categories/useGetCategories';
import useSearchParams from '@/hooks/useSearchParams';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import styles from './styles.module.css';

interface CategoriesProps {
	updateSearch: (categoryId?: number) => void;
}

const Categories = ({ updateSearch }: CategoriesProps) => {
	const tFetch = useFetchTranslation();

	const { data: categories, isLoading, isError } = useGetCategories();
	const [isActiveCategory, setIsActiveCategory] = useState(false);

	const { getParam, setParams } = useSearchParams();
	const categoryParam = getParam('category');

	const all = 'All Categories';
	const [category, setCategory] = useState(categoryParam ?? all);

	useEffect(() => {
		if (categories && categoryParam) {
			const category = categories.find((c) => c.name === categoryParam);
			updateSearch(category?.id);
		}
	}, [categories]);

	useEffect(() => {
		if (!categoryParam) {
			setCategory(all);
		}
	}, [all]);

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	if (isError || !categories) {
		return <>{tFetch('error')}</>;
	}

	const toggleDropdown = () => {
		setIsActiveCategory((prev) => !prev);
	};

	const setCategoryParam = (category?: string) => {
		if (category) setParams({ category: encodeURIComponent(category) });
	};

	const handleInput = (name: string) => {
		const category = categories.find((c) => c.name === name);

		setIsActiveCategory(false);
		if (category) {
			setCategory(category.name);
			updateSearch(category.id);
			setCategoryParam(category.name);
		} else {
			setCategory(all);
			updateSearch();
			setCategoryParam();
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
