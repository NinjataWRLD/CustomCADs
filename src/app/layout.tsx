import { Outlet } from 'react-router-dom';
import useLanguages from '@/hooks/locales/useLanguages';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Gradient from './components/gradient/gradient';

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
