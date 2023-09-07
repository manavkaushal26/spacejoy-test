// import { NotificationService } from '@components/NotificationMessage';
import SVGLoader from '@components/Shared/SVGLoader';
import affirm from '@utils/affirm';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
import fetcher from '@utils/fetcher';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Affirm = ({ cb }) => {
  const [submitInProgress, setSubmitInProgress] = useState(false);

  const AffirmCheckout = async (a) => {
    // NotificationService.success({
    //   title: `Affirm checkout successful, checkout token is: ${a.checkout_token}`,
    //   timer: 2,
    // });

    const response = await fetcher({
      endPoint: '/v1/orders/store/checkout',
      method: 'POST',
      body: {
        token: a.checkout_token,
        data: {
          type: 'affirm',
        },
      },
    });
    if (response.statusCode <= 300) {
      cb(true);
      PushEvent({
        category: 'Checkout',
        action: `Success to Affirm with Spacejoy - ${data?.shipping?.name?.first} ${data?.shipping?.name?.last}`,
        label: 'Success to Affirm with Spacejoy',
      });
      // NotificationService.success({
      //   title: `Your order has been successfully placed`,
      //   timer: 2,
      // });
    }
  };

  const handleClick = async () => {
    setSubmitInProgress(true);
    const res = await fetcher({ endPoint: '/v1/payments/affirmDetails', method: 'GET' });
    res.data.total = Number(res?.data?.total?.toFixed());

    if (res.statusCode <= 300) {
      affirm.checkout(res.data);
      affirm.checkout.open({
        onFail(e) {
          setSubmitInProgress(false);
          PushEvent({
            category: 'Checkout',
            action: `Error in Affirm - ${data?.shipping?.name?.first} ${data?.shipping?.name?.last}`,
            label: 'Error in Affirm',
          });
        },
        onSuccess(a) {
          setSubmitInProgress(false);
          AffirmCheckout(a);
        },
      });
    } else {
      setSubmitInProgress(false);
      toast.error(res?.data?.message);
    }
    //todo TEMP FIX --> NEED IMPROVEMENT
    setTimeout(() => {
      setSubmitInProgress(false);
    }, 5000);
  };

  return (
    <>
      <Image
        width="70px"
        height="30px"
        src={`${imageKit.baseDeliveryUrl}/w_70/v1595658009/shared/affirm_bm4ocs.svg`}
        alt="affirm logo"
      />
      <h4 className="y-margin-0">Big purchase? No problem.</h4>
      <br />
      <button
        className="px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm w-fit hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
        onClick={handleClick}
      >
        {submitInProgress ? <SVGLoader /> : <>Place your order</>}
      </button>
      <p className="mt-2 text-sm text-gray-500">With Affirm, you can buy now and pay monthly.</p>
    </>
  );
};

Affirm.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default React.memo(Affirm);
