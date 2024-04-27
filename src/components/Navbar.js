import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping, FaCircleUser, FaRegHeart } from 'react-icons/fa6';
import { useHandleDropdown } from '../utils/customHooks';
import { selectCartItemsCount, fetchCartAsync } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';

const navigation = [
  { name: 'Products', href: '/' },
  { name: 'Cart', href: '/cart' },
  { name: 'Checkout', href: '/checkout' },
];

const dropdown = [
  { name: 'Orders', href: '/orders' },
  { name: 'Wishlist', href: '/wishlist' },
  { name: 'Saved Addresses', href: '/addresses' },
  { name: 'Edit Profile', href: '/profile' },
  { name: 'Sign Out', href: '' },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const cartItemsCount = useSelector(selectCartItemsCount);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  useHandleDropdown(dropdownRef, setOpenDropdown);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleDropdownSelected = (e, option) => {
    if (option === 'Sign Out') {
      e.preventDefault();
    }

    toggleDropdown();
  };

  return (
    <header className='bg-gray-700 h-20 px-12 flex items-center gap-10 sticky top-0 z-10'>
      <Link to='.'>
        <img
          className='h-12'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
          alt='company-logo'
        />
      </Link>

      <nav className='flex-1 space-x-4'>
        {navigation.map(item => (
          <NavLink
            className={({ isActive }) =>
              classNames(
                'text-gray-200 px-3 py-2 rounded hover:text-white',
                isActive ? 'active' : ''
              )
            }
            key={item.name}
            to={item.href}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className='flex gap-8'>
        <Link className='relative' to='cart'>
          <span className='text-white text-2xl'>
            <FaCartShopping />
          </span>

          {cartItemsCount > 0 && (
            <span className='absolute -top-2 -right-1.5 bg-indigo-500 px-[5px] py-px text-white text-xs rounded'>
              {cartItemsCount}
            </span>
          )}
        </Link>

        <Link to='wishlist'>
          <span className='text-white text-2xl'>
            <FaRegHeart />
          </span>
        </Link>

        <div className='relative' ref={dropdownRef}>
          <button className='text-white text-2xl' onClick={toggleDropdown}>
            <FaCircleUser />
          </button>

          {openDropdown && (
            <div className='absolute w-48 right-0 top-10 z-20 bg-white ring-1 ring-black/10 shadow-lg rounded-md py-1'>
              {dropdown.map(item => (
                <Link
                  className='block px-5 py-2 text-sm hover:bg-gray-100'
                  to={item.href}
                  key={item.name}
                  onClick={e => handleDropdownSelected(e, item.name)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
