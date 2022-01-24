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
        href="https://auth.spacejoy.com"
        target="popup"
        onClick={() => {
          window.open('https://auth.spacejoy.com', 'popup', 'width=1000,height=1000');

          return false;
        }}
      >
        Login
      </a>
    </div>
  );
};

export default SignupPage;
