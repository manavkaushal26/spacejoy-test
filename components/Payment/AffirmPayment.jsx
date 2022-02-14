// import { NotificationService } from '@components/NotificationMessage';
import SVGLoader from '@components/Shared/SVGLoader';
import affirm from '@utils/affirm';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
    res.data.total = Number(res.data.total.toFixed());

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
          // NotificationService.error({
          //   title: 'Affirm checkout failed',
          //   timer: 2,
          // });
        },
        onSuccess(a) {
          setSubmitInProgress(false);
          AffirmCheckout(a);
        },
      });
    } else {
      setSubmitInProgress(false);
      // NotificationService.error({
      //   title: 'Affirm checkout is not valid',
      //   timer: 2,
      // });
    }
  };

  return (
    <>
      <Image
        width="70px"
        height="30px"
        src={`${cloudinary.baseDeliveryURL}/w_70/v1595658009/shared/affirm_bm4ocs.svg`}
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
