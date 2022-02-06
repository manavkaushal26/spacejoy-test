import { ShoppingCartIcon, SwitchHorizontalIcon, ViewGridIcon } from '@heroicons/react/outline';
import React, { useContext } from 'react';
import { NavSelectContext } from 'store/NavSelect';

const SideNav: React.FC = () => {
  const [nav, setNav] = useContext(NavSelectContext);

  return (
    <>
      <button
        className={`w-20 h-20 flex flex-col justify-center items-center transition hover:bg-gray-200 ${
          nav === 'collages' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900'
        }`}
        onClick={() => setNav('collages')}
      >
        <ViewGridIcon className="w-5 h-5" />
        <p className="text-xs mt-2 px-2">Design Sets</p>
      </button>
      <button
        className={`w-20 h-20 flex flex-col justify-center items-center transition hover:bg-gray-200 ${
          nav === 'store' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900 '
        }`}
        onClick={() => setNav('store')}
        id="product-nav"
      >
        <svg
          className="stroke-current fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <g fill="none" fillRule="evenodd" stroke="auto" strokeWidth="0.6">
            <g transform="translate(-388 -306)">
              <g transform="translate(388 306)">
                <g fillRule="nonzero" transform="translate(12.814 9)">
                  <path d="M12.537 10.593V3.485A3.488 3.488 0 009.053 0H5.17a3.489 3.489 0 00-3.484 3.485v7.107A2.335 2.335 0 000 12.832a2.335 2.335 0 002.332 2.333h4.401v3.658H3.26c-.21 0-.38.17-.38.379V22h.758v-2.42h3.096v2.333h.758V19.58h3.096V22h.757v-2.798c0-.209-.17-.379-.379-.379H7.491v-3.658h4.4a2.335 2.335 0 002.333-2.333 2.334 2.334 0 00-1.687-2.24zM2.444 3.485A2.73 2.73 0 015.171.758h3.882a2.73 2.73 0 012.727 2.727V10.5H2.444V3.485zm9.448 10.923h-9.56a1.577 1.577 0 01-1.574-1.576c0-.754.533-1.386 1.242-1.539a.37.37 0 00.066.007h10.093a.396.396 0 00.065-.007c.71.153 1.243.785 1.243 1.54 0 .868-.707 1.575-1.575 1.575z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <p className="text-xs mt-2 px-2">Products</p>
      </button>
      {/* <button
        className={`w-20 h-16 flex justify-center items-center transition hover:bg-gray-400 ${
          nav === 'pinterest' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900'
        }`}
        onClick={() => setNav('pinterest')}
      >
        <span className="sr-only">Pinterest</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <line
            x1="120"
            y1="88.00002"
            x2="88"
            y2="224.00002"
            fill="none"
            stroke={`${nav === 'pinterest' ? '#ffffff' : '#000000'}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M61.54451,156.55327A80.00347,80.00347,0,1,1,208,112c0,44.18278-32,72-64,72s-41.63152-21.06651-41.63152-21.06651"
            fill="none"
            stroke={`${nav === 'pinterest' ? '#ffffff' : '#000000'}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>
      <button
        className={`w-20 h-16 flex justify-center items-center transition hover:bg-gray-200 ${
          nav === 'upload' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900'
        }`}
        onClick={() => setNav('upload')}
      >
        <UploadIcon className="w-5 h-5" />
      </button> */}
      <button
        className={`w-20 h-20 flex flex-col justify-center items-center transition hover:bg-gray-200 ${
          nav === 'shop' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900'
        }`}
        id="shop-nav"
        onClick={() => setNav('shop')}
      >
        <ShoppingCartIcon className="w-5 h-5" />
        <p className="text-xs mt-2 px-2">Shopping List</p>
      </button>
      <button
        className={`w-20 h-20 flex flex-col justify-center items-center transition hover:bg-gray-200 ${
          nav === 'recommendations' ? 'bg-gray-900 text-white hover:text-gray-900' : 'bg-white text-gray-900'
        }`}
        onClick={() => setNav('recommendations')}
      >
        <SwitchHorizontalIcon className="w-5 h-5" />
        <p className="text-xs mt-2 px-2">Swap</p>
      </button>
    </>
  );
};

export default React.memo(SideNav);
