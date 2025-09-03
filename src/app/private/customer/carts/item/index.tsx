import { Clock, Truck, DollarSign } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { Route } from '@/routes/(private)/_customer/carts/$id/$productId';
import { useCartItemTranslation } from '@/hooks/locales/pages/customer';
import { useMoney } from '@/hooks/money/useMoney';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import Cad from '@/app/components/cad';
import * as dateTime from '@/utils/date-time';

const PurchasedCartItem = () => {
	const { history } = useRouter();
	const tCartItem = useCartItemTranslation();

	const { item, customization } = Route.useLoaderData();
	const price = useMoney(item.price);
	const cost = useMoney(item.cost);

	return (
		<Transition>
			<div className='flex flex-col min-h-screen'>
				<main className='flex flex-col items-center md:flex-row flex-1 p-4 gap-6'>
					<div className='w-full md:basis-[30%] bg-purple-200 rounded-lg shadow-md p-7'>
						<div>
							<div className='bg-opacity-50 p-4 rounded-lg'>
								<h2 className='text-lg text-center font-semibold text-purple-900'>
									{tCartItem('title-1')}
								</h2>
								<hr />
								<div>
									<div className='flex items-start gap-3'>
										<div className='p-2 bg-purple-300 text-purple-800 rounded-lg'>
											<Clock size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												{tCartItem('added-at')}
											</p>
											<p className='font-medium text-purple-900'>
												{dateTime.format({
													date: item.addedAt,
												})}
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='p-2 bg-pink-200 text-pink-700 rounded-lg'>
											<Truck size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												{tCartItem('delivery-status')}
											</p>
											<p className='font-medium text-purple-900'>
												{item.forDelivery
													? tCartItem(
															'delivery-option-1',
														)
													: tCartItem(
															'delivery-option-2',
														)}
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='p-2 bg-purple-300 text-purple-800 rounded-lg'>
											<DollarSign size={20} />
										</div>
										<div>
											<p className='text-sm text-purple-700'>
												{tCartItem('final-price-1')}
											</p>
											<div className='w-full flex justify-center items-center'>
												<div>
													<p>
														<strong className='mr-1.5'>
															{tCartItem('price')}
														</strong>
														{price}
													</p>
													<p>
														<strong className='mr-1.5'>
															{tCartItem(
																'quantity',
															)}
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
														{tCartItem(
															'final-price-2',
														)}
													</strong>
													{cost}
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
								{tCartItem('title-2')}
							</h2>
						</div>

						<div className='relative h-96 bg-slate-200 rounded-lg border-2 border-dashed border-purple-900 flex items-center justify-center cursor-pointer'>
							{item.forDelivery ? (
								<Cad
									type='cart'
									cartId={item.cartId}
									productId={item.productId}
									customization={customization!} // an exception is thrown if item is for delivery but customization is null
									forDelivery={item.forDelivery}
								/>
							) : (
								<Cad
									type='cart'
									cartId={item.cartId}
									productId={item.productId}
									forDelivery={item.forDelivery}
								/>
							)}
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
