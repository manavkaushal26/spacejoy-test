import toast from 'react-hot-toast';
import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';

const initialState = {
  addressType: { value: 'Home', error: false },
  title: { value: '', error: false },
  firstName: { value: '', error: false },
  lastName: { value: '', error: false },
  addressLine1: { value: '', error: false },
  addressLine2: { value: '', error: false },
  apartment: { value: '', error: false },
  userMobile: { value: '', error: false },
  city: { value: '', error: false },
  userState: { value: '', error: false },
  zipCode: { value: '', error: false },
};

const UserAddressForm = ({ callback, setShowForm, shippingAddresses, onCancelCallback }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState(initialState);

  const addNewAddress = async () => {
    const {
      addressType,
      title,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      apartment,
      userMobile,
      city,
      userState,
      zipCode,
    } = formState;
    const response = await fetcher({
      endPoint: '/v1/shippingAddresses',
      method: 'POST',
      body: {
        type: addressType.value,
        title: title.value,
        firstName: firstName.value,
        lastName: lastName.value,
        addressLine1: addressLine1.value,
        addressLine2: addressLine2.value,
        apartment: apartment.value,
        city: city.value,
        state: userState.value,
        zipCode: zipCode.value,
        phoneNumber: userMobile.value,
      },
    });
    if (response.statusCode <= 300) {
      toast.success('Address added successfully!');

      return [null, response.data];
    }
    toast.error('Address could not be added.');

    return [response?.data?.message, null];
  };

  const handleFormInputChange = (e: any, field: string) => {
    setFormState({ ...formState, [field]: { value: e.target.value, error: false } });
  };

  const handleCancel = () => {
    setFormState(initialState);
    onCancelCallback(shippingAddresses.filter((item) => item?.selected)[0]);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    // let hasError = false;
    e.preventDefault();

    // const Fields = ['firstName', 'lastName', 'addressLine1', 'userMobile', 'city', 'userState', 'zipCode'];
    // Fields.map((field) => {
    //   if (!formState[field].value) {
    //     hasError = true;
    //     setFormState({ ...formState, [field]: { value: formState[field].value, error: hasError } });
    //   }

    //   return false;
    // });
    // if (hasError) setErrorMessage('Please fill out the fields marked in red');

    const [err, data] = await addNewAddress();
    if (data) {
      setErrorMessage('');
      callback(data);
      setFormState(initialState);
    } else {
      setErrorMessage(err);
    }
  };

  return (
    <div className="pt-10 mt-10 border-t border-gray-200">
      <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Address Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={formState.title.value}
                onChange={(e) => handleFormInputChange(e, 'title')}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
              Select Address Type <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <select
                id="addressType"
                name="addressType"
                autoComplete="addressType"
                value={formState.addressType.value}
                onChange={(e) => handleFormInputChange(e, 'addressType')}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="Home" defaultChecked>
                  Home
                </option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                name="first-name"
                value={formState.firstName.value}
                onChange={(e) => handleFormInputChange(e, 'firstName')}
                autoComplete="given-name"
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={formState.lastName.value}
                onChange={(e) => handleFormInputChange(e, 'lastName')}
                autoComplete="family-name"
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc.
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="apartment"
                id="apartment"
                value={formState.apartment.value}
                onChange={(e) => handleFormInputChange(e, 'apartment')}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="addressLine1"
                id="addressLine1"
                autoComplete="street-address"
                value={formState.addressLine1.value}
                onChange={(e) => handleFormInputChange(e, 'addressLine1')}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="addressLine2"
                id="addressLine2"
                autoComplete="street-address"
                value={formState.addressLine2.value}
                onChange={(e) => handleFormInputChange(e, 'addressLine2')}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                id="city"
                value={formState.city.value}
                onChange={(e) => handleFormInputChange(e, 'city')}
                autoComplete="address-level2"
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              State / Province <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="region"
                id="region"
                value={formState.userState.value}
                onChange={(e) => handleFormInputChange(e, 'userState')}
                autoComplete="address-level1"
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Postal code <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                autoComplete="postal-code"
                maxLength={5}
                value={formState.zipCode.value}
                onChange={(e) => handleFormInputChange(e, 'zipCode')}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="tel"
                value={formState.userMobile.value}
                onChange={(e) => handleFormInputChange(e, 'userMobile')}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full mt-6 mb-6 space-x-2">
          <button
            onClick={handleCancel}
            className="px-5 py-2 text-sm font-medium text-gray-900 transition duration-200 bg-white border border-gray-900 rounded-md shadow-sm hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add address
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default React.memo(UserAddressForm);
