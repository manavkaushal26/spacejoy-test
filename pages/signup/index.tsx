import { authUrl } from '@utils/config';
import React from 'react';

const SignupPage = () => {
  // useEffect(() => {
  //   window.onmessage = (event) => {
  //     console.log('event recevied', event);
  //   };
  // }, []);

  return (
    <div className="h-screen">
      <a
        href={`${authUrl}`}
        target="popup"
        onClick={() => {
          window.open(`${authUrl}`, 'popup', 'width=1000,height=1000');

          return false;
        }}
      >
        Login
      </a>
    </div>
  );
};

export default SignupPage;
