import { useEffect, useState } from 'react';
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSearchParams from '@/hooks/useSearchParams';
import useGetProductSortings from '@/hooks/queries/products/gallery/useGetProductSortings';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useSortingsTranslation } from '@/hooks/locales/common/resources';
import { SortingDirection } from '@/api/common/enums/sortings';
import styles from './sortings.module.css';

interface SortingsProps {
	updateSearch: (sorting?: string, direction?: string) => void;
}

const Sortings = ({ updateSearch }: SortingsProps) => {
	const tFetch = useFetchTranslation();
	const tSortings = useSortingsTranslation();

	const { data: sortings, isLoading, isError } = useGetProductSortings();
	const [isActiveSort, setIsActiveSort] = useState(false);

	const { getParam, setParams } = useSearchParams();
	const sortingParam = getParam('sortingType');
	const directionParam = getParam('sortingDirection');

	const initial = tSortings('Initial');
	const [sorting, setSorting] = useState<string>(
		sortingParam ? tSortings(sortingParam) : initial,
	);
	const [direction, setDirection] = useState<SortingDirection>(
		directionParam
			? SortingDirection[directionParam as keyof typeof SortingDirection]
			: SortingDirection.Descending,
	);

	const setSortingParam = (sorting: string) =>
		setParams({
			sortingType: encodeURIComponent(sorting),
		});

	const setDirectionParam = (direction: string) =>
		setParams({
			sortingDirection: encodeURIComponent(direction),
		});

	useEffect(() => {
		if (!sortingParam) {
			setSorting(initial);
		}
	}, [initial]);

	const toggleDropdown = () => {
		setIsActiveSort((prev) => !prev);
	};

	const toggleDirection = () => {
		setDirection((prev) => {
			const set = (direction: SortingDirection) => {
				setDirectionParam(SortingDirection[direction]);
				updateSearch(undefined, SortingDirection[direction]);
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
	};

	const handleInput = (name: string) => {
		setSorting(() => tSortings(name));
		setIsActiveSort(false);

		updateSearch(name);
		setSortingParam(encodeURIComponent(name));
	};

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	if (isError || !sortings) {
		return <>{tFetch('error')}</>;
	}

	return (
		<>
			<div className={`${styles.menu}`}>
				<div
					className={`${styles['select-btn']} ${isActiveSort ? styles.active : ''}`}
					onClick={toggleDropdown}
				>
					<span className={`${styles.sort}`}>{sorting}</span>
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
									{tSortings(sorting)}
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
