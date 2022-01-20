// import { NotificationService } from '@components/NotificationMessage';
import affirm from '@utils/affirm';
import fetcher from '@utils/fetcher';
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

  return <button onClick={handleClick}>Pay With Affirm</button>;
};

Affirm.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default React.memo(Affirm);
