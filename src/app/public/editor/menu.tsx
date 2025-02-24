import { ReactNode, useState } from 'react';
import styles from './styles.module.css';

interface MenuProps {
	title: string;
	description: string;
	children: ReactNode;
}

const Menu = ({ title, description, children }: MenuProps) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((prev) => !prev);

	return (
		<div>
			<div onClick={toggleOpen} className={styles.materials}>
				<div>
					<h4 className={styles['material-title']}>{title}</h4>
					<p className={styles['material-description']}>
						{description}
					</p>
					<span className={styles['material-btn']}>
						{open ? '-' : '+'}
					</span>
				</div>
			</div>
			{open && children}
		</div>
	);
};

export default Menu;
