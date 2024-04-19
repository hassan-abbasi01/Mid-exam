import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { selectCartItems } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { fetchUserAddresses } from '../app/slices/addressSlice';
import AddressFormModal from '../components/AddressFormModal';
import DeliveryAddressCard from '../components/DeliveryAddressCard';
import DeliveryOptionCard from '../components/DeliveryOptionCard';
import OrderItem from '../components/OrderItem';

const deliveryOptions = [
  {
    type: 'standard',
    shippingTime: '4-10 business days',
    shippingCharges: 30,
    default: true,
  },
  {
    type: 'express',
    shippingTime: '2-5 business days',
    shippingCharges: 100,
    default: false,
  },
];

const Checkout = () => {
  const addresses = useSelector(state => state.address.addresses);
  const defaultAddress = useSelector(state =>
    state.address.addresses.find(address => address.default)
  );
  const user = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(
    deliveryOptions.find(option => option.default)
  );

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserAddresses(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [defaultAddress]);

  const addressList = useMemo(
    () =>
      addresses.length
        ? new Array(
            addresses.find(address => address.default),
            ...addresses.filter(address => !address.default)
          )
        : [],
    [addresses]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((amount, item) => amount + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const toggleAddressModal = () => setOpenAddressModal(!openAddressModal);

  return (
    <section className='grid grid-cols-2 gap-12'>
      <section className='divide-y divide-gray-200'>
        <div className='pb-10'>
          <h2 className='text-xl'>Your addresses</h2>

          <ul className='mt-6 space-y-5'>
            {addressList.map(address => (
              <DeliveryAddressCard
                key={address.id}
                address={address}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            ))}
          </ul>

          <button
            className='mt-6 font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
            onClick={toggleAddressModal}
          >
            <FaPlus />
            <span>Add new address</span>
          </button>

          {openAddressModal && (
            <AddressFormModal
              closeModal={toggleAddressModal}
              setSelectedAddress={setSelectedAddress}
            />
          )}
        </div>

        <div className='pt-10'>
          <h2 className='text-xl'>Delivery method</h2>

          <ul className='mt-6 flex gap-5'>
            {deliveryOptions.map(option => (
              <DeliveryOptionCard
                key={option.type}
                option={option}
                selectedOption={selectedDeliveryOption}
                setSelectedOption={setSelectedDeliveryOption}
              />
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className='text-xl'>Order summary</h2>

        <div className='mt-6 border border-gray-200 rounded-lg divide-y divide-gray-200'>
          <ul className='divide-y divide-gray-200'>
            {cartItems.map(item => (
              <OrderItem
                key={item.id}
                id={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </ul>

          <div className='p-6'>
            <div className='flex flex-col gap-2.5'>
              <label className='font-medium text-gray-500 self-start' htmlFor='couponCode'>
                Coupon code
              </label>

              <div className='flex items-center gap-4'>
                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 rounded-md shadow focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='couponCode'
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />

                <button className='px-4 py-2 rounded-md ring-1 ring-gray-300 bg-gray-100 font-medium text-gray-500'>
                  Apply
                </button>
              </div>

              {couponError && <p className='text-sm text-red-500'>{couponError}</p>}
            </div>

            <div className='pt-8 pb-6 space-y-5'>
              <div className='flex justify-between *:text-gray-500'>
                <h3>Subtotal</h3>
                <p className='font-medium'>₹{cartTotal}</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3 className='flex items-center gap-3'>
                  Discount
                  <span className='uppercase text-xs bg-gray-200 px-3 py-1 rounded-full'>
                    cheapskate
                  </span>
                </h3>
                <p className='font-medium'>-₹20</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Shipping</h3>
                <p className='font-medium'>₹{selectedDeliveryOption.shippingCharges}</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Taxes</h3>
                <p className='font-medium'>₹20</p>
              </div>
            </div>

            <div className='pt-6 flex justify-between *:text-lg border-t border-gray-200'>
              <h3>Total</h3>
              <p className='font-medium'>
                ₹{cartTotal + selectedDeliveryOption.shippingCharges + 20}
              </p>
            </div>
          </div>

          <div className='p-6'>
            <button className='w-full block bg-indigo-600 py-3 rounded-md text-white font-medium hover:bg-indigo-700'>
              Confirm order
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Checkout;
