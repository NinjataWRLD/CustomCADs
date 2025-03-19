import { Outlet } from '@tanstack/react-router';
import { CartProvider } from '@/contexts/cart/provider';
import { useAuth } from '@/hooks/stores/useAuth';
import { useLanguages } from '@/hooks/locales/useLanguages';
import Header from './components/header';
import Footer from './components/footer';
import Gradient from './components/gradient';

const Layout = () => {
	useAuth();
	useLanguages();

	return (
		<CartProvider>
			<Header />
			<Gradient />
			<main>
				<Outlet />
			</main>
			<Footer />
		</CartProvider>
	);
};

export default Layout;
