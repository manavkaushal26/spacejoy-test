import Link from 'next/link';
import React from 'react';

const LoginManager = ({ redirect = '/', ctaText = 'Login', styles = '' }) => {
  return (
    <Link href="/auth/login">
      <a
        className={
          styles ? styles : 'text-gray-700 text-xs py-1.5 px-3 ml-2 rounded-lg border border-gray-600 hover:bg-gray-50 '
        }
        href={`https://auth.spacejoy.com?redirect=${redirect}`}
        target="popup"
        onClick={() => {
          window.open(`https://auth.spacejoy.com?redirect=${redirect}`, 'popup', 'width=1200,height=830');

          return false;
        }}
      >
        {ctaText}
      </a>
    </Link>
  );
};

export default LoginManager;
