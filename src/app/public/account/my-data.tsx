import { url as downloadInfoUrl } from '@/api/identity/identity/download-info';
import { axios } from '@/api/axios';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useDeleteMyAccount } from '@/hooks/mutations/identity';

const MyData = () => {
	const tMyAccount = useMyAccountTranslation();
	const { mutateAsync: deleteMyAccount } = useDeleteMyAccount();

	const url = `${axios.defaults.baseURL}${downloadInfoUrl()}`;
	const handleDownload = () => window.open(url);
	const handleDelete = async () => await deleteMyAccount();

	return (
		<>
			<div>
				<h2>{tMyAccount('download-data')}</h2>
				<button
					onClick={handleDownload}
					className="relative z-[1] inline-block w-[200px] h-[50px] p-[10px] text-[14px] tracking-[1px] uppercase text-white text-center font-bold bg-black border-[3px] border-solid border-[#6347b55a] rounded-[30px] shadow-[0_2px_10px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.1)] cursor-pointer no-underline transition-all duration-300 ease-in-out hover:text-black focus:text-black active:scale-90 before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:right-1/2 before:bg-white before:rounded-[30px] before:z-[-1] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:left-0 hover:before:right-0 hover:before:opacity-100 focus:before:left-0 focus:before:right-0 focus:before:opacity-100"
				>
					{tMyAccount('download-data-btn')}
				</button>
			</div>

			<div className='relative flex flex-col justify-center gap-0 ml-0 mt-[5%]'>
				<h2>{tMyAccount('delete-account')}</h2>
				<button
					onClick={handleDelete}
					className="relative z-[1] inline-block w-[200px] h-[50px] p-[10px] text-[14px] tracking-[1px] uppercase text-white text-center font-bold bg-black border-[3px] border-solid border-[#6347b55a] rounded-[30px] shadow-[0_2px_10px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.1)] cursor-pointer no-underline transition-all duration-300 ease-in-out hover:text-black focus:text-black active:scale-90 before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:right-1/2 before:bg-white before:rounded-[30px] before:z-[-1] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:left-0 hover:before:right-0 hover:before:opacity-100 focus:before:left-0 focus:before:right-0 focus:before:opacity-100"
				>
					{tMyAccount('delete-account-btn')}
				</button>
			</div>
		</>
	);
};

export default MyData;
