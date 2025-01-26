import type { Metadata } from 'next';
import './globals.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import Wrapper from './wrapper';

library.add(fas, faFacebook, faInstagram, faLinkedin);

export const metadata: Metadata = {
	title: 'CustomCADs',
	description: 'E-shop for 3D Models',
	icons: {
		icon: '/favicons/favicon.ico',
	},
	manifest: '/favicons/site.webmanifest',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Wrapper>{children}</Wrapper>
			</body>
		</html>
	);
}
