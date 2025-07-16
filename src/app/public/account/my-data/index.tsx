import { useState } from 'react';
import { url as downloadInfoUrl } from '@/api/identity/identity/download-info';
import { axios } from '@/api/axios';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import {
	useDeleteMyAccount,
	useToggleTrackViewedProducts,
} from '@/hooks/mutations/identity';
import ToggleButton from '@/app/components/toggle-button';
import Row from './row';

const MyData = ({ trackViewedProducts }: { trackViewedProducts: boolean }) => {
	const tMyAccount = useMyAccountTranslation();
	const url = `${axios.defaults.baseURL}${downloadInfoUrl()}`;
	const handleDownload = () => window.open(url);

	const { mutateAsync: deleteMyAccount } = useDeleteMyAccount();
	const handleDelete = async () => await deleteMyAccount();

	const [track, setTrack] = useState(trackViewedProducts);
	const { mutateAsync: toggle } = useToggleTrackViewedProducts();
	const handleToggle = async () => {
		await toggle();
		setTrack((prev) => !prev);
	};

	return (
		<>
			<Row
				type='button'
				title={tMyAccount('track-viewed-products')}
				button={<ToggleButton initial={track} onClick={handleToggle} />}
			/>
			<Row
				type='text'
				title={tMyAccount('download-data')}
				text={tMyAccount('download-data-btn')}
				onClick={handleDownload}
			/>
			<Row
				type='text'
				title={tMyAccount('delete-account')}
				text={tMyAccount('delete-account-btn')}
				onClick={handleDelete}
			/>
		</>
	);
};

export default MyData;
