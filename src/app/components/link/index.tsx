import { forwardRef } from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import styles from './styles.module.css';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	text: string;
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
	(props, ref) => (
		<a ref={ref} {...props} className={styles.link}>
			<div className={`${styles.button}`}>{props.text}</div>
			<div className={`${styles['button-gradient']}`}></div>
		</a>
	),
);

const CreatedLinkComponent = createLink(BasicLinkComponent);
const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => (
	<CreatedLinkComponent preload={'intent'} {...props} />
);
export default CustomLink;
