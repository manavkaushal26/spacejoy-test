import React, { useEffect } from 'react';

const SignupPage = () => {
  useEffect(() => {
    window.onmessage = (event) => {
      console.log('event recevied', event);
    };
  }, []);

  return (
    <div className="h-screen">
      <iframe src="https://auth.spacejoy.com/" className="h-full w-full" />
    </div>
  );
};

export default SignupPage;
