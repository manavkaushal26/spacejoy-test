import React, { useEffect } from 'react';

const SignupPage = () => {
  useEffect(() => {
    window.onmessage = (event) => {
      console.log('event recevied', event);
    };
  }, []);

  useEffect(() => {
    //listen to message event
    window.addEventListener(
      'message',
      (event) => {
        console.log('event recevied', event);
      },
      false
    );
  }, []);

  return (
    <div className="h-screen">
      <a
        href="http://localhost:3000"
        target="popup"
        onClick={() => {
          window.open('http://localhost:3000', 'popup', 'width=1000,height=1000');

          return false;
        }}
      >
        Login
      </a>
    </div>
  );
};

export default SignupPage;
