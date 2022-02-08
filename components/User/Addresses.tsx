import LoadingState from '@components/Shared/LoadingState';
import UserAddressForm from '@components/User/UserAddressForm';
import { RadioGroup } from '@headlessui/react';
import {
  CheckCircleIcon,
  HomeIcon,
  PlusIcon,
  TrashIcon,
  BriefcaseIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import fetcher from '@utils/fetcher';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useStore } from '@lib/store';
import shallow from 'zustand/shallow';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const deliveryMethods = [
  { id: 1, title: 'Address 1', turnaround: 'Address 1 details', price: '' },
  { id: 2, title: 'Address 2', turnaround: 'Address 2 details', price: '' },
];

const defaultOption = { type: 'new_address' };

const UserAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { updateCart: setCartData } = useStore(
    (store) => ({
      updateCart: store.updateCart,
    }),
    shallow
  );

  const updateCart = async () => {
    try {
      const res = await fetcher({ endPoint: '/v1/cart', method: 'GET' });
      if (res.statusCode < 301) {
        setCartData(res?.data);
      }    } catch {
      throw new Error();
    }
  };

  const updateDeliveryAddress = async (data, method) => {
    setSelectedDeliveryAddress(data);
    const { type = '' } = data;
    if (type && type !== 'new_address') {
      setShowForm(false);
      const { _id } = data;
      const res = await fetcher({ endPoint: '/v1/shippingAddresses', method: 'PUT', body: { selected: true, _id } });

      if (res.statusCode < 301) {
        if (method === 'add') {
          setShippingAddresses([
            ...shippingAddresses
              .filter((item) => item.type !== 'new_address')
              .map((address) => {
                return { ...address, selected: false };
              }),
            { ...data, selected: true },
            defaultOption,
          ]);
        } else {
          setShippingAddresses([
            ...shippingAddresses.map((item) => {
              if (item._id === data._id) {
                return { ...item, selected: true };
              }

              return { ...item, selected: false };
            }),
          ]);
        }
        updateCart();
      }
    } else {
      setShowForm(true);
    }
  };

  const updateAddressBook = (address) => {
    updateDeliveryAddress(address, 'add');
    setShowForm(false);
  };

  const removeAddress = (id) => {
    setShippingAddresses((prevState) => prevState.filter((address) => address._id !== id));
    if (selectedDeliveryAddress === id) setSelectedDeliveryAddress('');
  };

  const handleDeleteAddress = async (id) => {
    const response = await fetcher({
      endPoint: `/v1/shippingAddresses/${id}`,
      method: 'DELETE',
    });
    if (response.statusCode <= 300) {
      toast.success(response?.data?.message);
      removeAddress(id);
    } else {
      toast.error(response?.data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const shippingAddresses = await fetcher({ endPoint: '/v1/shippingAddresses', method: 'GET' });
        const { data, statusCode } = shippingAddresses;

        if (statusCode < 301) {
          const { addresses = [] } = data;
          setShippingAddresses([...addresses, defaultOption]);
        } else {
          setShippingAddresses([{ ...defaultOption, selected: false }]);
        }
      } catch {
        setShippingAddresses([{ ...defaultOption, selected: false }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (shippingAddresses?.length) {
      setSelectedDeliveryAddress(shippingAddresses.filter((item) => item?.selected)[0]);
    }
  }, [shippingAddresses]);

  return (
    <>
      <div>
        <RadioGroup value={selectedDeliveryAddress} onChange={(data) => updateDeliveryAddress(data, 'update')}>
          <RadioGroup.Label className="text-lg font-medium text-gray-900">1. Delivery Addresses</RadioGroup.Label>
          {loading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {shippingAddresses?.map((shippingAddress, index) => (
                <RadioGroup.Option
                  key={`shipping-${index}`}
                  value={shippingAddress}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? 'border-transparent relative' : 'border-gray-300 relative',
                      active ? 'ring-2 ring-indigo-500' : '',
                      'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none focus:ring-0 select-none'
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      {shippingAddress?.type === 'new_address' ? (
                        <div className="flex items-center justify-center flex-1">
                          <div className="flex flex-col items-center">
                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                              <PlusIcon className="w-8 h-8" />
                            </RadioGroup.Label>
                            <RadioGroup.Description as="span" className="flex items-center mt-4 text-sm text-gray-500">
                              Add New Address
                            </RadioGroup.Description>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="flex flex-1">
                            <div className="flex flex-col mb-8">
                              <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                <div className="flex">
                                  <span>
                                    {shippingAddress.type === 'Home' && <HomeIcon className="w-4 h-4 mr-2" />}
                                    {shippingAddress.type === 'Work' && <BriefcaseIcon className="w-4 h-4 mr-2" />}
                                    {shippingAddress.type === 'Other' && (
                                      <LocationMarkerIcon className="w-4 h-4 mr-2" />
                                    )}
                                  </span>
                                  <span>{shippingAddress.title}</span>
                                </div>
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="flex items-center mt-1 text-sm text-gray-500"
                              >
                                {shippingAddress.firstName} {shippingAddress.lastName}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="flex items-center mt-1 text-sm text-gray-500"
                              >
                                {shippingAddress.apartment}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="flex items-center mt-1 text-sm text-gray-500"
                              >
                                {shippingAddress.addressLine1}
                              </RadioGroup.Description>
                              <RadioGroup.Description as="span" className="mt-1 text-sm font-medium text-gray-500">
                                {shippingAddress.addressLine2}
                              </RadioGroup.Description>
                              <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-500">
                                {shippingAddress.city} {shippingAddress.state} - {shippingAddress.zipCode}
                              </RadioGroup.Description>
                            </div>
                          </div>
                        </div>
                      )}

                      {shippingAddress.type !== 'new_address' && (
                        <TrashIcon
                          className="absolute w-5 h-5 text-gray-800 transition duration-200 bottom-4 right-4 hover:text-red-500"
                          onClick={() => handleDeleteAddress(shippingAddress._id)}
                        />
                      )}
                      {checked ? (
                        <CheckCircleIcon
                          className="absolute w-5 h-5 text-indigo-600 top-4 right-4"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div
                        className={classNames(
                          active ? 'border-2' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'absolute -inset-px rounded-lg pointer-events-none'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          )}
        </RadioGroup>
      </div>
      <div>
        {showForm && (
          <UserAddressForm
            callback={updateAddressBook}
            setShowForm={setShowForm}
            shippingAddresses={shippingAddresses}
            onCancelCallback={setSelectedDeliveryAddress}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(UserAddresses);
