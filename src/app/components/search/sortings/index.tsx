import { useEffect, useState } from 'react';
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetProductSortings } from '@/hooks/queries/products/gallery';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { SortingDirection } from '@/types/sorting';
import styles from '../styles.module.css';

interface SortingsProps {
	getSorting: () => { type?: string; direction?: string };
	updateSorting: (sorting: { type?: string; direction?: string }) => void;
	isActive: boolean;
	setActive: (active: boolean) => void;
}

const Sortings = ({
	getSorting,
	updateSorting,
	isActive,
	setActive,
}: SortingsProps) => {
	const tFetch = useFetchTranslation();

	const { data: sortings, isLoading, isError } = useGetProductSortings();

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
					className={`${styles['select-btn']} ${isActive ? styles.active : ''}`}
					onClick={toggleDropdown}
				>
					<span className={`${styles.sort}`}>{sorting}</span>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>

				{sortings && (
					<ul className={`${styles.list}`}>
						{sortings.map((sorting, index) => (
							<li
								key={sorting}
								value={sorting}
								className={`${styles.option}`}
								style={
									{
										'--i': index,
									} as React.CSSProperties
								}
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
						className={sorting === initial ? styles.grey : ''}
					/>
				</div>
			</div>
		</>
	);
};

export default Sortings;
