import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../app/slices/cartSlice';
import CartItem from '../components/CartItem';
import EmptyCart from '../pages/EmptyCart';

const Cart = () => {
  const status = useSelector(state => state.cart.status);
  const cartItems = useSelector(selectCartItems);
  const error = useSelector(state => state.cart.error);

  if (status === 'idle' || status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    throw error;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='max-w-3xl mx-auto w-full'>
        <h1 className='text-3xl text-center'>Shopping cart</h1>

        <section className='mt-10'>
          <ul className='divide-y divide-gray-200 border-y border-gray-200'>
            {cartItems.toReversed().map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </ul>

          <div className='mt-8'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-lg font-medium'>Subtotal</p>
                <p className='mt-1 text-gray-500 text-sm'>
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <p className='text-lg font-medium'>
                ₹
                {cartItems.reduce((amount, item) => amount + item.product.price * item.quantity, 0)}
              </p>
            </div>

            <div className='mt-7'>
              <Link to='/checkout'>
                <button className='w-full block bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'>
                  Checkout
                </button>
              </Link>

              <p className='mt-5 text-center'>
                or{' '}
                <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/'>
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Cart;
