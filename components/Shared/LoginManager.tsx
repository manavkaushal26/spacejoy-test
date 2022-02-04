import Link from 'next/link';
import React from 'react';

const LoginManager = ({ redirect = '/' }) => {
  return (
    <Link href="/auth/login">
      <a
        className="text-gray-700 text-xs py-1.5 px-3 ml-2 rounded-lg border border-gray-600 hover:bg-gray-50"
        href={`http://localhost:3000?redirect=${redirect}`}
        target="popup"
        onClick={() => {
          window.open(`http://localhost:3000?redirect=${redirect}`, 'popup', 'width=1200,height=830');

          return false;
        }}
      >
        LOGIN
      </a>
    </Link>
  );
};

export default LoginManager;
