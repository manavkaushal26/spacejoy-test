import shoppingBagIcon from '@public/images/empty-bag.svg';
import Image from 'next/image';

const EmptyCart = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={shoppingBagIcon}
            alt="Interior Designs"
            width={90}
            height={100}
            className="rounded-tl-xl rounded-tr-xl"
          />
          <h3 className="text-xl">Your cart is empty</h3>
          <h5 className="text-xs">Looks like you have not added anything to your cart.</h5>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
