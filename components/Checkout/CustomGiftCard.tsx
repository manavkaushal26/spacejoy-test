import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';

interface CustomGiftCardInterface {
  setShowGiftCardInput: (boolean) => void;
  onSuccess: (successData: any) => void;
  onError: () => void;
}

const CustomGiftCard: React.FC<CustomGiftCardInterface> = ({ onSuccess, onError, setShowGiftCardInput }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isGiftCard, setIsGiftCard] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [applyingCoupon, setApplyCoupon] = useState(false);

  const handleInputChange = (e) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };

  const applyCoupon = async (couponCode, isGiftCard) => {
    try {
      setApplyCoupon(true);
      const res = await fetcher({
        endPoint: '/v1/cartCoupons',
        method: 'POST',
        body: { coupon: couponCode, isGiftCard: isGiftCard },
      });
      const { data, statusCode } = res;

      if (statusCode > 301) {
        throw new Error(data);
      } else {
        onSuccess(data);
        setShowGiftCardInput(false);
      }
    } catch (e) {
      onError();
    } finally {
      setApplyCoupon(false);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (
      inputValue.toUpperCase().startsWith('SPGC') ||
      inputValue.toUpperCase().startsWith('SPCC') ||
      inputValue.toUpperCase().startsWith('SGC')
    ) {
      setIsGiftCard(true);
    } else setIsGiftCard(false);

    if (inputValue.length < 3) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [inputValue]);

  return (
    <div className="relative flex items-center mt-4">
      <input
        type="text"
        name="coupon"
        id="coupon-code"
        placeholder="Gift Card Code"
        value={inputValue.toUpperCase()}
        onChange={handleInputChange}
        className={`w-full py-3 text-sm rounded-md checkout-textarea transition duration-200 ${
          isEmpty && 'bg-transparent'
        } ${isGiftCard && 'bg-green-100'} ${!isGiftCard && 'bg-red-100'} `}
      />
      <button
        type="submit"
        disabled={!isGiftCard}
        className={`absolute px-5 py-2 text-sm rounded-md font-medium text-white bg-gray-900 border border-transparent shadow-sm right-1 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
        onClick={() => {
          applyCoupon(inputValue, isGiftCard);
        }}
      >
        {applyingCoupon ? (
          <svg
            className="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <span>APPLY</span>
        )}
      </button>
    </div>
  );
};

export default CustomGiftCard;
