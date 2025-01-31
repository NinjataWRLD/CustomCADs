import { useEffect, useState } from 'react';
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './sortings.module.css';
import useGetProductSortings from '@/hooks/queries/products/gallery/useGetProductSortings';
import { SortingDirection } from '@/api/common/enums/sortings';

interface SortingsProps {
	updateSearch: (sorting: string, direction: string) => void;
}

const Sortings = ({ updateSearch }: SortingsProps) => {
	const { data: sortings, isLoading, isError } = useGetProductSortings();

	const [isActiveSort, setIsActiveSort] = useState(false);
	const [sorting, setSorting] = useState<string>();
	const [direction, setDirection] = useState<SortingDirection>(
		SortingDirection.Descending,
	);

	useEffect(() => {
		if (sorting) {
			updateSearch(sorting, SortingDirection[direction]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting, direction]);

	const toggleSortDropdown = () => {
		setIsActiveSort((prev) => !prev);
	};

	const handleInput = (type: string) => {
		setSorting(() => type);
		setIsActiveSort(false);
	};

	const toggleDirection = () => {
		setDirection((prev) =>
			prev === SortingDirection.Ascending
				? SortingDirection.Descending
				: SortingDirection.Ascending,
		);
	};

	if (isLoading) {
		return <>Loading...</>;
	}

	if (isError || !sortings) {
		return <>Error!</>;
	}

	return (
		<>
			<div className={`${styles.menu}`}>
				<div
					className={`${styles['select-btn']} ${isActiveSort ? styles.active : ''}`}
					onClick={toggleSortDropdown}
				>
					<span className={`${styles.sort}`}>
						{sorting ?? 'Sort By'}
					</span>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
				{sortings && (
					<ul className={`${styles.list}`}>
						{sortings.map((sorting) => (
							<li
								key={sorting}
								value={sorting}
								className={`${styles.option}`}
								onClick={() => handleInput(sorting)}
							>
								<span className={`${styles.name}`}>
									{sorting}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<div
				className={styles.arrows}
				style={{ height: '55px' }}
				onClick={() => {
					if (sorting) {
						toggleDirection();
					}
				}}
			>
				<div
					className={`${styles.tooltip} ${!sorting ? styles.disabled : ''}`}
					data-tooltip={
						!sorting ? 'Select Sorting' : direction?.toString()
					}
				>
					<FontAwesomeIcon
						icon={
							direction === SortingDirection.Ascending
								? faArrowUp
								: faArrowDown
						}
					/>
				</div>
			</div>
		</>
	);
};

export default Sortings;
