/* eslint-disable i18next/no-literal-string */
import { useRouter } from '@tanstack/react-router';
import { Route } from '@/routes/(private)/_customer/carts/$id/$productId';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import Cad from '@/app/components/cad';
import * as money from '@/utils/money';
import styles from './styles.module.css';

const PurchasedCartItem = () => {
	const { history } = useRouter();
	const { item, customization } = Route.useLoaderData();

	return (
		<Transition>
			<div className={styles.container}>
				<div className={`${styles.product}`}>
					<div className={`${styles.model}`}>
						<div className={`${styles.visualizer}`}>
							<Cad
								type='cart'
								cartId={item.cartId}
								productId={item.productId}
								customization={customization}
							/>
						</div>
					</div>
					<div className={`${styles.details}`}>
						<div className={`${styles.info}`}>
							<div className={`${styles.check}`}>
								<label>
									<span>Delivery: {item.forDelivery}</span>
								</label>
							</div>
							<hr />
							<div className={styles.calculations}>
								<div>
									<p>
										<strong>Price:</strong>
										{money.format(
											money.fromBase({
												money: item.price,
											}),
										)}
									</p>
									<p>
										<strong>Quantity:</strong>{' '}
										{item.quantity}
									</p>
								</div>
								<div className={styles.braces}></div>
								<div className={styles.arrow}></div>
								<p style={{ marginLeft: '10px' }}>
									<strong>Final Price:</strong>
									{money.format(
										money.fromBase({ money: item.cost }),
									)}
								</p>
							</div>
						</div>

						<div className={`${styles.buttons}`}>
							<Button
								text='Go Back'
								type='button'
								onClick={() => history.back()}
							/>
							<CustomLink
								text='Go to Product'
								to='/gallery/$id'
								params={{ id: item.productId }}
							/>
						</div>
						<p>*Customizing the model may reflect its price!</p>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default PurchasedCartItem;
