import { Outlet } from 'react-router-dom';
import { useLanguages } from '@/hooks/locales/useLanguages';
import Header from './components/header';
import Footer from './components/footer';
import Gradient from './components/gradient';

const Layout = () => {
	useLanguages();

	return (
		<>
			<Header />
			<Gradient />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
