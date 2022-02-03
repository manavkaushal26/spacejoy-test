import React from 'react';
interface CartSummaryDimmerInterface{
  noBtn?:boolean;
}

const CartSummaryDimmer:React.FC<CartSummaryDimmerInterface> = ({noBtn}) => {
  return (
    <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 sticky top-20" >
      <div className="space-y-5 w-50 p-5 animate-pulse bg-white rounded-md">
    <div className="w-full h-10 bg-gray-200 rounded-md" />

    <div className="divide-y">
      <div className="flex flex-row justify-between my-5">
        <div className="h-5 w-1/2 bg-gray-200  rounded-md" />
        <div className="h-5 w-1/4 bg-gray-200  rounded-md" />
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
        <div className="h-5 w-1/4 bg-gray-200 rounded-md" />
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
        <div className="h-5 w-1/4 bg-gray-200 rounded-md" />
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
        <div className="h-5 w-1/4 bg-gray-200 rounded-md" />
      </div>
    </div>

    {noBtn ? null : <div className="w-full h-10 bg-gray-200" />}
  </div>
    </section>
    
  )
};

export default CartSummaryDimmer;
