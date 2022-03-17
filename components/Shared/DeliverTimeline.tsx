import { ChevronDownIcon } from '@heroicons/react/outline';
import useLocalStorageState from '@hooks/useLocalStorage';
import { PushEvent } from '@utils/analyticsLogger';
import fetcher from '@utils/fetcher';
import { isDigit } from '@utils/helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SVGLoader from './SVGLoader';

const domain = 'https://delivery.spacejoy.com/';

const DeliveryTimeline = ({ productId }) => {
  const [isAvailableForRetailer, setIsAvailableForRetailer] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({ status: true, data: { estimation: '' } });
  const [zipCode, setZipCode] = useLocalStorageState('zipCode', '91423');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const gaClickRef = useRef<boolean>();

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkIfRetailerEnabled = async () => {
      const response = await fetcher({
        endPoint: `${domain}v1/assets/${productId}/retailerAvailable`,
        method: 'GET',
        hasBaseUrl: true,
      });

      if (response?.statusCode <= 300) {
        setIsAvailableForRetailer(response.data.status);
      }
    };

    if (productId) {
      checkIfRetailerEnabled();
    }
  }, [productId]);

  const getDeliveryDetails = async () => {
    setIsLoading(true);
    if (zipCode?.length === 5 && isDigit(zipCode)) {
      const response = await fetcher({
        endPoint: `${domain}v1/deliveryEstimation`,
        method: 'POST',
        hasBaseUrl: true,
        body: {
          assetId: productId,
          zipcode: zipCode,
        },
      });

      if (response?.statusCode <= 300) {
        setDeliveryDetails(response.data);
        setIsExpanded(false);
      }
    } else {
      setErrorMessage('Please enter valid Zipcode');
    }
    setIsLoading(false);
  };

  const onValueChange = (e) => {
    setZipCode(e.target.value?.trim()?.slice(0, 5));
    setDeliveryDetails({ status: false, data: { estimation: '' } });
  };

  const isCheckDisabled = useMemo(() => {
    return zipCode?.length !== 5 || !isDigit(zipCode);
  }, [zipCode]);

  useEffect(() => {
    if (zipCode.length === 5) {
      if (gaClickRef?.current) {
        PushEvent({
          category: 'Check Pincode',
          action: `Success | Check Pincode | ${zipCode}`,
          label: `Check Pincode`,
        });
      }
      gaClickRef.current = true;
    }
  }, [zipCode]);

  useEffect(() => {
    if (isAvailableForRetailer && !isCheckDisabled) {
      getDeliveryDetails();
    }
  }, [isAvailableForRetailer, isCheckDisabled]);

  const toggleExpandZipCode = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return isAvailableForRetailer ? (
    // <div id={!deliveryDetails?.status || errorMessage?.length > 0} className="flex items-center">
    <div className="space-y-4 text-sm">
      <div className="flex items-center">
        <div className="flex space-x-2 whitespace-nowrap">
          <strong>Ship to: </strong>
          <button className="flex items-center justify-center space-x-1" onClick={toggleExpandZipCode}>
            <span className="underline zipcode underline-offset-2">{!isExpanded && zipCode}</span>{' '}
            {!isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : null}
          </button>
        </div>
        {isExpanded && (
          <div id="zipcode-input">
            <div className="relative ml-2">
              <input
                type="text"
                className="z-0 w-full h-12 pl-4 pr-20 rounded-lg focus:shadow focus:outline-none"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={onValueChange}
              />
              <div className="absolute top-2 right-2">
                <button
                  disabled={isCheckDisabled}
                  onClick={getDeliveryDetails}
                  className="flex items-center justify-center w-20 h-8 text-white bg-gray-900 rounded-lg"
                >
                  {isLoading ? <SVGLoader /> : 'Check'}
                </button>
              </div>
            </div>
          </div>
        )}

        {errorMessage.length > 0 && <p>{errorMessage}</p>}
      </div>
      <p className="font-bold delivery-message">{deliveryDetails?.data?.estimation}</p>
    </div>
  ) : (
    <></>
  );
};

DeliveryTimeline.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default DeliveryTimeline;
