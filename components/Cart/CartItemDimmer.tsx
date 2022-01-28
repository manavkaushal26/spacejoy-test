import React from 'react';

const CartItemDimmer: React.FC = () => {
  return (
    <li className="flex py-6 sm:py-10 h-60 animate-pulse">
      <div className="w-1/4 bg-gray-200  rounded-md" />
      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between h-5 bg-gray-200 rounded-md" />
            <div className="mt-4 flex h-4 w-3/4 bg-gray-200 rounded-md" />
            <div className="mt-4 h-4 w-1/6 font-medium text-gray-900 bg-gray-200 rounded-md" />
          </div>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="w-10 h-5 bg-gray-200 rounded-md" />
            <div className="absolute top-0 right-0 h-5 w-5 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="mt-4 h-5 bg-gray-200 rounded-md" />
      </div>
    </li>
  );
};

export default React.memo(CartItemDimmer);
