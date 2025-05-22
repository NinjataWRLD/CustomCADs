import { url as downloadInfoUrl } from '@/api/identity/identity/download-info';
import { axios } from '@/api/axios';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useDeleteMyAccount } from '@/hooks/mutations/identity';
import styles from './styles.module.css';

const MyData = () => {
	const tMyAccount = useMyAccountTranslation();
	const { mutateAsync: deleteMyAccount } = useDeleteMyAccount();

	const url = `${axios.defaults.baseURL}${downloadInfoUrl()}`;
	const handleDownload = () => window.open(url);
	const handleDelete = async () => await deleteMyAccount();

	return (
		<>
			<div className={`${styles.export}`}>
				<h2>{tMyAccount('download-data')}</h2>
				<button onClick={handleDownload} className={styles.button}>
					{tMyAccount('download-data-btn')}
				</button>
			</div>

			<div className={`${styles.section} ${styles.delete}`}>
				<h2>{tMyAccount('delete-account')}</h2>
				<button
					onClick={handleDelete}
					className={`${styles.deleteBtn}`}
				>
					{tMyAccount('delete-account-btn')}
				</button>
			</div>
		</>
	);
};

export default MyData;
