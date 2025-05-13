/* eslint-disable i18next/no-literal-string */
import { useRouter } from '@tanstack/react-router';
import { Route } from '@/routes/(private)/_customer/carts/$id/$productId';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import Cad from '@/app/components/cad';
import * as money from '@/utils/money';
import { Clock, Truck, DollarSign } from 'lucide-react';

const PurchasedCartItem = () => {
	const { history } = useRouter();
	const { item, customization } = Route.useLoaderData();

	const formatDate = (dateStr: string): string => {
		const date = new Date(dateStr);

		if (isNaN(date.getTime())) {
			throw new Error('Invalid date string');
		}

		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	};

	return (
		<Transition>
			<div className='flex flex-col min-h-screen'>
				<main className='flex flex-col items-center md:flex-row flex-1 p-4 gap-6'>
					<div className='w-full md:basis-[30%] bg-purple-200 rounded-lg shadow-md p-7'>
						<div>
							<div className='bg-opacity-50 p-4 rounded-lg'>
								<h2 className='text-lg text-center font-semibold text-purple-900'>
									Item Details
								</h2>
								<hr />
								<div>
									<div className='flex items-start gap-3'>
										<div className='p-2 bg-purple-300 text-purple-800 rounded-lg'>
											<Clock size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												Added at
											</p>
											<p className='font-medium text-purple-900'>
												{formatDate(item.addedAt)}
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='p-2 bg-pink-200 text-pink-700 rounded-lg'>
											<Truck size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												Delivery Status
											</p>
											<p className='font-medium text-purple-900'>
												{item.forDelivery
													? 'Ready for delivery'
													: 'Digital download only'}
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='p-2 bg-purple-300 text-purple-800 rounded-lg'>
											<DollarSign size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												Final Price
											</p>
											<div className='w-full flex justify-center items-center'>
												<div>
													<p>
														<strong className='mr-1.5'>
															Price:
														</strong>
														{money.format(
															money.fromBase({
																money: item.price,
															}),
														)}
													</p>
													<p>
														<strong className='mr-1.5'>
															Quantity:
														</strong>
														{item.quantity}
													</p>
												</div>
												<div className='inline-block relative w-2.5 h-12 rotate-180 ml-2.5'>
													<div className='absolute top-0 left-0 w-2.5 h-6 border-2 border-r-0 border-b-0 border-purple-500 rounded-full'></div>
													<div className='absolute bottom-0 left-0 w-2.5 h-6 border-2 border-r-0 border-t-0 border-purple-500 rounded-full'></div>
												</div>
												<div className="inline-block relative w-[30px] h-2.5 bg-purple-700 ml-2.5 rounded-tl-[5px] rounded-bl-[5px] after:content-[''] after:absolute after:-translate-y-2/4 after:rotate-45 after:w-2.5 after:h-2.5 after:border-[solid] after:border-[46,255)] after:border-[2px_2px_0_0] after:right-0 after:top-2/4 before:content-[''] before:absolute before:-translate-y-2/4 before:-rotate-45 before:w-2.5 before:h-2.5 before:border-[solid] before:border-[46,255)] before:border-[0_2px_2px_0] before:right-0 before:top-2/4"></div>
												<p className='ml-[10px]'>
													<strong className='mr-1.5'>
														Final Price:
													</strong>
													{money.format(
														money.fromBase({
															money: item.cost,
														}),
													)}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr />
							<div className='flex justify-center pt-4'>
								<Button
									text='Go Back'
									type='button'
									onClick={() => history.back()}
								/>
							</div>
						</div>
					</div>

					<div className='w-full md:basis-[60%] bg-purple-200 rounded-lg shadow-md p-7'>
						<div className='flex justify-center items-center mb-4'>
							<h2 className='text-xl font-semibold text-purple-900'>
								3D Visualizer
							</h2>
						</div>

						<div className='relative h-96 bg-slate-200 rounded-lg border-2 border-dashed border-purple-900 flex items-center justify-center cursor-pointer'>
							<Cad
								type='cart'
								cartId={item.cartId}
								productId={item.productId}
								customization={customization}
							/>
						</div>

						<div className='mt-4 flex justify-center'>
							<CustomLink
								text='Go to Product'
								to='/gallery/$id'
								params={{ id: item.productId }}
							/>
						</div>
					</div>
				</main>
			</div>
		</Transition>
	);
};

export default PurchasedCartItem;
