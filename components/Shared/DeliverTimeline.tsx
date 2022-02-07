import useLocalStorageState from '@hooks/useLocalStorage';
import fetcher from '@utils/fetcher';
import { isDigit } from '@utils/helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import SVGLoader from './SVGLoader';

const domain = 'https://delivery.spacejoy.com/';

const DeliveryTimeline = ({ productId }) => {
  const [isAvailableForRetailer, setIsAvailableForRetailer] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({ status: true, data: { estimation: '' } });
  const [zipCode, setZipCode] = useLocalStorageState('zipCode', '91423');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        // PushEvent({
        // 	category: "Check Pincode",
        // 	action: `Success | Check Pincode`,
        // 	label: `Check Pincode`,
        // });
        setIsExpanded(false);
      }
    } else {
      setErrorMessage('Please enter valid Zipcode');
      // PushEvent({
      // 	category: "Check Pincode",
      // 	action: `Failure | Check Pincode`,
      // 	label: `Check Pincode`,
      // });
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
    if (isAvailableForRetailer && !isCheckDisabled) {
      getDeliveryDetails();
      // PushEvent({
      // 	category: "Added Pin Code",
      // 	action: `Added Pin Code | ${zipCode}`,
      // 	label: `Added Pin Code`,
      // });
    }
  }, [isAvailableForRetailer, isCheckDisabled]);

  const toggleExpandZipCode = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return isAvailableForRetailer ? (
    // <div id={!deliveryDetails?.status || errorMessage?.length > 0} className="flex items-center">
    <div className="text-sm space-y-4">
      <div className="flex items-center">
        <div>
          <strong>Ship to: </strong>
          <button className="expand-zipcode" onClick={toggleExpandZipCode}>
            <span className="zipcode underline underline-offset-2">{!isExpanded && zipCode}</span>{' '}
            <span className="icon-chevron-down" />
          </button>
        </div>
        {isExpanded && (
          <div id="zipcode-input">
            <div className="relative ">
              <input
                type="text"
                className="h-12 w-full pl-4 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={onValueChange}
              />
              <div className="absolute top-2 right-2">
                <button
                  disabled={isCheckDisabled}
                  onClick={getDeliveryDetails}
                  className="h-8 w-20 text-white rounded-lg bg-gray-900 flex justify-center items-center"
                >
                  {isLoading ? <SVGLoader /> : 'Check'}
                </button>
              </div>
            </div>
          </div>
        )}

        {errorMessage.length > 0 && <p>{errorMessage}</p>}
      </div>
      <p className="delivery-message font-bold">{deliveryDetails?.data?.estimation}</p>
    </div>
  ) : (
    <></>
  );
};

DeliveryTimeline.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default DeliveryTimeline;
