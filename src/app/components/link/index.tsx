import { forwardRef } from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	text: string;
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
	(props, ref) => (
		<a
			ref={ref}
			{...props}
			className='text-center text-white relative inline-block no-underline cursor-pointer'
		>
			<div
				className='
          font-bold text-inherit relative z-10 px-6 py-3 
          rounded-full scale-110 bg-[hsla(271,42%,54%,0.358)] backdrop-blur-[10px]
          hover:translate-y-2.5 hover:shadow-[-10px_0_50px_hsl(270,30%,40%),10px_0_50px_hsl(250,10%,18%)]
          active:translate-y-[5px]
          transition-transform transition-shadow duration-200 ease-in-out
        '
			>
				{props.text}
			</div>

			<div
				className='
          absolute inset-0 rounded-full z-[9] translate-y-2.5
          shadow-[5px_0_10px_hsl(270,30%,40%),5px_0_10px_hsl(250,10%,18%)]
          bg-gradient-to-tr from-[hsl(270,30%,40%)] to-[hsl(289,88%,19%)]
        '
			></div>
		</a>
	),
);

const CreatedLinkComponent = createLink(BasicLinkComponent);
const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => (
	<CreatedLinkComponent preload='intent' {...props} />
);

export default CustomLink;
