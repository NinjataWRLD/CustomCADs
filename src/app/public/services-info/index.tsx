import React, { useEffect } from 'react';
import {
	faShoppingCart,
	faPencilRuler,
	faShippingFast,
	faUpload,
	faDownload,
	faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { useServicesTranslation } from '@/hooks/locales/pages/public';
import Transition from '@/app/components/transition';
import Service from './service';

const ServicesInfo: React.FC = () => {
	const tServices = useServicesTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Transition>
			<div className='relative max-w-[1200px] mx-auto my-0 px-5 py-10'>
				<h1 className='text-[2.8rem] text-[white] text-center mb-2.5 title-text-shadow'>
					{tServices('title')}
				</h1>
				<h2 className='text-[1.6rem] text-[#e0b0ff] text-center font-normal tracking-[1px]'>
					{tServices('subTitle')}
				</h2>
				<div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[40px] mt-[50px]'>
					<Service
						title={tServices('serviceTitle1')}
						details={tServices('serviceDetails1')}
						role={tServices('serviceRoles1')}
						icon={faShoppingCart}
						button={tServices('serviceButtonText1')}
					/>
					<Service
						title={tServices('serviceTitle2')}
						details={tServices('serviceDetails2')}
						role={tServices('serviceRoles2')}
						icon={faPencilRuler}
						button={tServices('serviceButtonText2')}
					/>
					<Service
						title={tServices('serviceTitle3')}
						details={tServices('serviceDetails3')}
						role={tServices('serviceRoles3')}
						icon={faShippingFast}
						button={tServices('serviceButtonText3')}
					/>
					<Service
						title={tServices('serviceTitle4')}
						details={tServices('serviceDetails4')}
						role={tServices('serviceRoles4')}
						icon={faDownload}
						button={tServices('serviceButtonText4')}
					/>
					<Service
						title={tServices('serviceTitle5')}
						details={tServices('serviceDetails5')}
						role={tServices('serviceRoles5')}
						icon={faUpload}
						button={tServices('serviceButtonText5')}
					/>
					<Service
						title={tServices('serviceTitle6')}
						details={tServices('serviceDetails6')}
						role={tServices('serviceRoles6')}
						icon={faHandshake}
						button={tServices('serviceButtonText6')}
					/>
				</div>
			</div>
		</Transition>
	);
};

export default ServicesInfo;
