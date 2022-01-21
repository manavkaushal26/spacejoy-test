import UserAddressForm from '@components/User/UserAddressForm';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, HomeIcon, PlusIcon } from '@heroicons/react/outline';
import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const deliveryMethods = [
  { id: 1, title: 'Address 1', turnaround: 'Address 1 details', price: '' },
  { id: 2, title: 'Address 2', turnaround: 'Address 2 details', price: '' },
];
const UserAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [shippingAddresses, setShippingAddress] = useState([]);
  const [selectedDeliveyAddress, setSelectedDeliveryAddress] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const defaultOption = { type: 'new_address' };
      try {
        const shippingAddresses = await fetcher({ endPoint: '/v1/shippingAddresses', method: 'GET' });
        const { data, statusCode } = shippingAddresses;

        if (statusCode < 301) {
          const { addresses = [] } = data;
          setShippingAddress([...addresses, defaultOption]);
        } else {
          setShippingAddress([{ ...defaultOption, selected: false }]);
        }
      } catch {
        setShippingAddress([{ ...defaultOption, selected: false }]);
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

  const [showForm, setShowForm] = useState(false);

  const updateDeliveryAddress = async (data) => {
    setSelectedDeliveryAddress(data);
    const { type = '' } = data;
    if (type && type !== 'new_address') {
      setShowForm(false);
      const { _id } = data;
      await fetcher({ endPoint: '/v1/shippingAddresses', method: 'PUT', body: { selected: true, _id } });
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <div>
        <RadioGroup value={selectedDeliveyAddress} onChange={(data) => updateDeliveryAddress(data)}>
          <RadioGroup.Label className="text-lg font-medium text-gray-900">1. Delivery Addresses</RadioGroup.Label>

          <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {shippingAddresses.map((shippingAddress, index) => (
              <RadioGroup.Option
                key={`shipping-${index}`}
                value={shippingAddress}
                className={({ checked, active }) =>
                  classNames(
                    checked ? 'border-transparent relative' : 'border-gray-300 relative',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
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
                      <div className="flex flex-1">
                        <div className="flex flex-col">
                          <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                            <div className="flex">
                              <span>
                                <HomeIcon className="w-4 h-4 mr-2" />
                              </span>
                              <span>{shippingAddress.title}</span>
                            </div>
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className="flex items-center mt-1 text-sm text-gray-500">
                            {shippingAddress.firstName} {shippingAddress.lastName}
                          </RadioGroup.Description>
                          <RadioGroup.Description as="span" className="flex items-center mt-1 text-sm text-gray-500">
                            {shippingAddress.apartment}
                          </RadioGroup.Description>
                          <RadioGroup.Description as="span" className="flex items-center mt-1 text-sm text-gray-500">
                            {shippingAddress.addressLine1}
                          </RadioGroup.Description>
                          <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                            {shippingAddress.addressLine2}
                          </RadioGroup.Description>
                          <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                            {shippingAddress.city} {shippingAddress.state} - {shippingAddress.zipCode}
                          </RadioGroup.Description>
                        </div>
                      </div>
                    )}

                    {checked ? (
                      <CheckCircleIcon className="absolute w-5 h-5 text-indigo-600 top-4 right-4" aria-hidden="true" />
                    ) : null}
                    <div
                      className={classNames(
                        active ? 'border' : 'border-2',
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
        </RadioGroup>
      </div>
      <div>{showForm && <UserAddressForm />}</div>
    </>
  );
};

export default React.memo(UserAddresses);
