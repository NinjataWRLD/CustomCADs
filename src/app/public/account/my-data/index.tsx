import { url as downloadInfoUrl } from '@/api/identity/identity/download-info';
import { axios } from '@/api/axios';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useDeleteMyAccount } from '@/hooks/mutations/identity';
import Row from './row';

const MyData = () => {
	const tMyAccount = useMyAccountTranslation();
	const url = `${axios.defaults.baseURL}${downloadInfoUrl()}`;
	const handleDownload = () => window.open(url);

	const { mutateAsync: deleteMyAccount } = useDeleteMyAccount();
	const handleDelete = async () => await deleteMyAccount();

	return (
		<>
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
