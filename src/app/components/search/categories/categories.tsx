import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGetCategories from '@/hooks/queries/categories/useGetCategories';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useCategoriesTranslation } from '@/hooks/locales/common/resources';
import styles from './categories.module.css';

interface CategoriesProps {
	updateSearch: (categoryId: number) => void;
}

const Categories = ({ updateSearch }: CategoriesProps) => {
	const tFetch = useFetchTranslation();
	const tCategories = useCategoriesTranslation();

	const { data: categories, isLoading, isError } = useGetCategories();
	const [isActiveCategory, setIsActiveCategory] = useState(false);

	const all = tCategories('All');
	const [category, setCategory] = useState(all);
	useEffect(() => {
		setCategory(all);
	}, [all]);

	const toggleDropdown = () => {
		setIsActiveCategory((prev) => !prev);
	};

	const handleInput = (name: string) => {
		const category = categories?.find((c) => c.name === name);

		setCategory(tCategories(category?.name ?? all));
		setIsActiveCategory(false);

		updateSearch(category?.id ?? undefined!);
	};

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	if (isError || !categories) {
		return <>{tFetch('error')}</>;
	}

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
					<span className={`${styles.name}`}>{tCategories(all)}</span>
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
							{tCategories(category.name)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
