import { useState } from 'react';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useToggleTrackViewedProducts } from '@/hooks/mutations/identity';
import ToggleButton from '@/app/components/toggle-button';

type TrackViewedProductsProps = { initial: boolean };
const TrackViewedProducts = ({ initial }: TrackViewedProductsProps) => {
	const tMyAccount = useMyAccountTranslation();

	const [track, setTrack] = useState(initial);
	const { mutateAsync: toggle } = useToggleTrackViewedProducts();

	const handleToggle = async () => {
		await toggle();
		setTrack((prev) => !prev);
	};

	return (
		<div className='relative flex items-center gap-8'>
			<h2>{tMyAccount('track-viewed-products')}</h2>
			<ToggleButton initial={track} onClick={handleToggle} />
		</div>
	);
};

export default TrackViewedProducts;
