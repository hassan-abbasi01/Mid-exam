import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderById } from '../app/slices/orderSlice';
import { classNames, formatDate } from '../utils/helpers';

const orderProgressSteps = [
  { label: 'Order placed', status: 'created', width: '10%', align: 'text-left' },
  { label: 'Processing', status: 'processing', width: '38%', align: 'text-center' },
  { label: 'Shipped', status: 'shipped', width: '63%', align: 'text-center' },
  { label: 'Delivered', status: 'delivered', width: '100%', align: 'text-right' },
];

const OrderDetails = () => {
  const { id } = useParams();

  const status = useSelector(state => state.order.selectedOrderStatus);
  const order = useSelector(state => state.order.selectedOrder);
  const error = useSelector(state => state.order.selectedOrderError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const getOrderUpdate = (orderStatus, isoDateString) => {
    const date = formatDate(isoDateString, 'long');

    switch (orderStatus) {
      case 'created':
        return `Order placed on ${date}`;
      case 'processing':
        return `Processing on ${date}`;
      case 'shipped':
        return `Shipped on ${date}`;
      case 'delivered':
        return `Delivered on ${date}`;
      default:
        return '';
    }
  };

  if (status === 'idle' || status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  const progressWidth = orderProgressSteps.find(step => step.status === order.status).width;
  const progressIndex = orderProgressSteps.findIndex(step => step.status === order.status);

  return (
    <section>
      <header className='flex justify-between items-end'>
        <h2 className='text-3xl'>Order #{order.id}</h2>
        <p>
          Order placed{' '}
          <span className='font-medium text-gray-600'>{formatDate(order.date, 'long')}</span>
        </p>
      </header>

      <div className='mt-8 border border-gray-200 rounded-lg'>
        <ul className='divide-y divide-gray-200'>
          {order.items.map(item => (
            <li className='p-6 flex items-start gap-6' key={item.id}>
              <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden'>
                <img
                  className='w-full h-full object-cover object-center'
                  src={item.product.thumbnail}
                  alt={item.product.title}
                />
              </div>

              <div className='flex-1 space-y-1.5'>
                <h3>{item.product.title}</h3>
                <h4>₹{item.product.price}</h4>
                <p>{item.product.description}</p>
              </div>

              <p className='space-x-2.5'>
                <span className='font-medium text-gray-600'>Quantity</span>
                <span>{item.quantity}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className='p-6 border-t border-gray-200'>
          <p className='font-medium text-gray-600'>{getOrderUpdate(order.status, order.date)}</p>

          <div className='mt-6 w-full h-2 rounded-full bg-gray-200 overflow-hidden'>
            <div
              className='h-full rounded-full bg-indigo-600 transition-[width] ease-in-out duration-300'
              style={{ width: progressWidth }}
            />
          </div>

          <ul className='mt-4 grid grid-cols-4'>
            {orderProgressSteps.map((step, index) => (
              <li
                className={classNames(
                  step.align,
                  index <= progressIndex ? 'text-indigo-600 font-medium' : ''
                )}
                key={index}
              >
                {step.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-8 p-6 rounded-lg bg-gray-100 grid grid-cols-3 gap-10'>
        <div>
          <h4>Shipping address</h4>

          <div className='mt-2.5 *:text-sm *:text-gray-900 space-y-1'>
            <p>{order.deliveryAddress.line1}</p>
            <p>
              {order.deliveryAddress.line2}, {order.deliveryAddress.city}
            </p>
            <p>
              {order.deliveryAddress.state}, {order.deliveryAddress.country}{' '}
              {order.deliveryAddress.postalCode}
            </p>
          </div>
        </div>

        <div>
          <h4>Payment information</h4>

          <div className='mt-2.5 *:text-sm *:text-gray-900 space-y-1'>
            <p>Ending with {order.paymentDetails.cardNo.slice(-4)}</p>
            <p>Expires in {order.paymentDetails.cardExpiry}</p>
          </div>
        </div>

        <ul className='divide-y divide-gray-300 *:py-3.5 *:flex *:justify-between *:text-sm *:text-gray-900'>
          <li>
            <span>Subtotal</span>
            <span>₹{order.total}</span>
          </li>

          <li>
            <span>Shipping</span>
            <span>₹{order.shippingCharges}</span>
          </li>

          <li>
            <span>Tax</span>
            <span>₹{order.tax}</span>
          </li>

          <li className='font-medium'>
            <span>Order total</span>
            <span className='text-indigo-600'>₹{order.amountPaid}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default OrderDetails;
