import Header from './components/header/header';
import Footer from './components/footer/footer';
import Gradient from './components/gradient/gradient';
import { Outlet } from 'react-router-dom';

const App = () => {
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

export default App;
