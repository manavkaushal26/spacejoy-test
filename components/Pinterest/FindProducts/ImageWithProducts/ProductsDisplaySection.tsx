import LottieAnimation from '@components/Shared/LottieAnimation';
import { Disclosure } from '@headlessui/react';
import DevWorking from '@public/lotties/dev-working.json';
import React from 'react';
import { useSearchProductsWithImageContext } from '../UseSearchProductsFromImageProvider';
import DisplayProducts from './DisplayProducts';
function MyDisclosure() {
  return (
    <Disclosure>
      <Disclosure.Button className="py-2">Is team pricing available?</Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        Yes! You can purchase a license that you can share with your entire team.
      </Disclosure.Panel>
    </Disclosure>
  );
}

const ProductsDisplaySection: React.FC = () => {
  const { categoryHues, repeatMarkedCategories, loading } = useSearchProductsWithImageContext();

  return (
    <div>
      <div className="text-lg font-bold tracking-wide mb-4 ">Product recommendations from your pin</div>
      {repeatMarkedCategories?.length === 0 && !loading.findingProducts && (
        <div className="flex flex-col text-center">
          <LottieAnimation height={250} width={300} animationData={DevWorking} />
          <p className="font-bold text-gray-800">
            Looks like we couldn&apos;t identify any products from this image. Please select another image.{' '}
          </p>
          <p className="  text-gray-600">
            P.S. This is a Beta product and we’re working hard to bring you the best experience
          </p>
        </div>
      )}
      {repeatMarkedCategories?.map((data, i) => {
        return <DisplayProducts hue={categoryHues[data?.productCategory]} key={data?.queryProductUrl} box={data} />;
      })}
    </div>
  );
};

export default ProductsDisplaySection;
