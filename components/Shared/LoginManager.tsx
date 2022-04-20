import { UserIcon } from '@heroicons/react/outline';
import { authUrl } from '@utils/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';

const LoginManager = ({ redirect = '/', ctaText = null, styles = '', onClick = () => {} }) => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <Link href="/auth/login">
      <a
        className={
          styles
            ? styles
            : ` ${
                mobile
                  ? 'border-0'
                  : 'text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-50 px-3 ml-2 border border-gray-600 flex items-center'
              }`
        }
        href={`${authUrl}?redirect=${redirect}`}
        target="popup"
        onClick={() => {
          window.open(`${authUrl}?redirect=${redirect}`, 'popup', 'width=1200,height=830');
          onClick();

          return false;
        }}
      >
        {mobile && ctaText === 'Login' ? <UserIcon className="w-6 h-6 cursor-pointer" /> : ctaText}
      </a>
    </Link>
  );
};

export default LoginManager;
