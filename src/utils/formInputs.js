import { REGEX } from './constants';

export const signupInputs = [
  {
    label: 'First name',
    type: 'text',
    id: 'firstname',
    name: 'firstname',
    autoComplete: 'given-name',
    required: true,
    errorMessage: 'First name is required.',
  },
  {
    label: 'Last name',
    type: 'text',
    id: 'lastname',
    name: 'lastname',
    autoComplete: 'family-name',
  },
  {
    label: 'Email address',
    type: 'email',
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    label: 'Phone',
    type: 'tel',
    id: 'phoneNo',
    name: 'phoneNo',
    autoComplete: 'tel',
    required: true,
    pattern: REGEX.PHONE,
    errorMessage: 'Please enter a valid phone number.',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    name: 'password',
    autoComplete: 'new-password',
    required: true,
    pattern: REGEX.PASSWORD,
    errorMessage:
      'Password must be 6-20 characters long and should contain atleast one digit, one letter and one special character.',
  },
  {
    label: 'Confirm password',
    type: 'password',
    id: 'confirm-password',
    name: 'confirmPassword',
    autoComplete: 'new-password',
    required: true,
    errorMessage: "Passwords don't match.",
  },
];

export const loginInputs = [
  {
    label: 'Email address',
    type: 'email',
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    name: 'password',
    autoComplete: 'current-password',
    required: true,
    pattern: '^.{6,20}$',
    errorMessage: 'Password must contain between 6 and 20 characters.',
    isLogin: true,
  },
];

export const forgotPasswordInput = {
  label: 'Email address',
  type: 'email',
  id: 'email',
  name: 'email',
  autoComplete: 'email',
  required: true,
  errorMessage: 'Please enter a valid email address.',
};

export const addressInputs = [
  {
    label: 'Full name',
    type: 'text',
    id: 'fullname',
    name: 'fullname',
    autoComplete: 'name',
    required: true,
    errorMessage: 'Please enter a name.',
  },
  {
    label: 'Phone',
    type: 'tel',
    id: 'phoneNo',
    name: 'phoneNo',
    autoComplete: 'tel',
    required: true,
    pattern: REGEX.PHONE,
    errorMessage:
      'Please enter a valid phone number so we can call if there are any issues with delivery.',
  },
  {
    label: 'Flat, building, apartment',
    type: 'text',
    id: 'line1',
    name: 'line1',
    autoComplete: 'address-line1',
    required: true,
    errorMessage: 'Please enter an address.',
  },
  {
    label: 'Area, street, sector',
    type: 'text',
    id: 'line2',
    name: 'line2',
    autoComplete: 'address-line2',
  },
  {
    label: 'Landmark',
    type: 'text',
    id: 'landmark',
    name: 'landmark',
    placeholder: 'E.g. near apollo hospital',
  },
  {
    label: 'Country',
    id: 'country',
    name: 'country',
    autoComplete: 'country-name',
    required: true,
    errorMessage: 'Please enter a country.',
  },
  {
    label: 'State',
    id: 'state',
    name: 'state',
    required: true,
    errorMessage: 'Please enter a state, region or province.',
  },
  {
    label: 'City',
    id: 'city',
    name: 'city',
    required: true,
    errorMessage: 'Please enter a city name.',
  },
  {
    label: 'Postal code',
    type: 'text',
    id: 'postal-code',
    name: 'postalCode',
    autoComplete: 'postal-code',
    required: true,
    pattern: REGEX.POSTAL_CODE,
    errorMessage: 'Please enter a valid ZIP or postal code.',
  },
];

export const editProfileInputs = [
  {
    label: 'Firstname',
    type: 'text',
    id: 'firstname',
    name: 'firstname',
    autoComplete: 'given-name',
    required: true,
    errorMessage: 'Firstname is required.',
  },
  {
    label: 'Lastname',
    type: 'text',
    id: 'lastname',
    name: 'lastname',
    autoComplete: 'family-name',
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email',
    name: 'email',
    required: true,
    disabled: true,
  },
  {
    label: 'Phone',
    type: 'tel',
    id: 'phoneNo',
    name: 'phoneNo',
    autoComplete: 'tel',
    required: true,
    pattern: REGEX.PHONE,
    errorMessage: 'Please enter a valid phone number.',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    name: 'password',
    autoComplete: 'new-password',
    pattern: REGEX.PASSWORD,
    errorMessage:
      'Password must be 6-20 characters long and should contain atleast one digit, one letter and one special character.',
  },
  {
    label: 'Confirm Password',
    type: 'password',
    id: 'confirm-password',
    name: 'confirmPassword',
    autoComplete: 'new-password',
    errorMessage: "Passwords don't match.",
  },
];

export const productInputs = [
  {
    label: 'Title',
    type: 'text',
    id: 'title',
    name: 'title',
    required: true,
    errorMessage: 'Product title is required.',
  },
  {
    label: 'Description',
    id: 'description',
    name: 'description',
    required: true,
    errorMessage: 'Product description is required.',
  },
  {
    label: 'Category',
    type: 'text',
    id: 'category',
    name: 'category',
    required: true,
    errorMessage: 'Product category is required',
  },
  {
    label: 'Brand',
    type: 'text',
    id: 'brand',
    name: 'brand',
    required: true,
    errorMessage: 'Product brand is required',
  },
  {
    label: 'Price',
    type: 'text',
    id: 'price',
    name: 'price',
    required: true,
    errorMessage: 'Product price is required',
  },
  {
    label: 'Stock',
    type: 'text',
    id: 'stock',
    name: 'stock',
    required: true,
    errorMessage: 'Product stock is required',
  },
];
