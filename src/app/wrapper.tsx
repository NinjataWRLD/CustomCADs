'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Gradient from './components/gradient/gradient';
import Header from './components/header/header';
import Footer from './components/footer/footer';

export default function Wrapper({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Gradient />
			{children}
			<Footer />
		</QueryClientProvider>
	);
}
