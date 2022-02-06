import ProductCard from '@components/Shop/ProductCard';
import { Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoxShape, useSearchProductsWithImageContext } from '../UseSearchProductsFromImageProvider';
const multiAssetEndpoint = '/v1/assets/getAssetsDetail';

const Header = styled.h2<{ hue: number }>`
  &::before {
    content: '';
    border: 10px ${({ hue }) => `hsl(${hue}, 95%, 75%) double`};
    border-radius: 50%;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const DisplayProducts: React.FC<{ box: BoxShape; hue: number }> = ({ box, hue }) => {
  const { productCategory, similarAssetIds: assetIds, queryProductUrl } = box;

  const [loading, setLoading] = useState({
    findingProducts: false,
    loadingProducts: true,
  });
  const [products, setProducts] = useState([]);
  const { selectedBox, setSelectedBox } = useSearchProductsWithImageContext();
  const getAssetData = async (assetIdList) => {
    setLoading({
      findingProducts: false,
      loadingProducts: true,
    });
    const endPoint = multiAssetEndpoint;

    const response = await fetcher({
      endPoint,
      method: 'POST',
      body: {
        assets: assetIdList.slice(0, 80),
        fields: [
          'price',
          'dimension',
          'currency',
          'retailer',
          'imageUrl',
          '_id',
          'meta',
          'name',
          'cdn',
          'retailLink',
          'retailerId',
          'inStock',
          'spriteAvailable',
        ],
      },
    });
    if (response.statusCode <= 300) {
      setProducts(response?.data);
    }
    setLoading({
      findingProducts: false,
      loadingProducts: false,
    });
  };

  useEffect(() => {
    if (assetIds.length > 0) {
      getAssetData(assetIds);
    }
  }, [assetIds]);

  const onSelect = (box: BoxShape) => {
    if (box.queryProductUrl === selectedBox?.queryProductUrl) {
      setSelectedBox(undefined);
    } else {
      setSelectedBox(box);
    }
  };
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Disclosure key={queryProductUrl}>
        <Disclosure.Button className="w-full">
          <button
            className="border transition-shadow hover:shadow-lg block w-full my-2 text-left p-4 rounded-lg pl-12 relative"
            onClick={() => onSelect(box)}
          >
            <Header hue={hue}>{productCategory}</Header>
          </button>
        </Disclosure.Button>
        <Transition
          show={selectedBox?.queryProductUrl === queryProductUrl}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          unmount={false}
        >
          <Disclosure.Panel static className="pt-2 pb-4">
            {/* {loading?.loadingProducts && <LottieAnimation animationData={loading} />} */}
            {!loading?.loadingProducts && (
              <div className="grid grid-cols-3 gap-4">
                {assetIds?.slice(0, 5).map((productId) => {
                  const product = products[productId];

                  return (
                    <div className="border rounded-lg" key={product?._id}>
                      {product && <ProductCard product={product} />}
                    </div>
                  );
                })}
                {assetIds.length > 5 && (
                  <button
                    className="border rounded-lg flex justify-center items-center  transition-all hover:shadow-md h-full"
                    onClick={toggleOpen}
                  >
                    <span className="text-2xl font-bold">See more</span>
                  </button>
                )}
              </div>
            )}
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
      {open && (
        <div className="h-screen fixed top-0 left-0 inset-0 overflow-hidden overscroll-y-contain z-50">
          <button
            className="bg-black/50 block w-full top-0 cursor-auto  absolute overscroll-contain pointer-events-auto left-0 inset-0 z-50"
            onClick={toggleOpen}
          />
          <div className="h-screen overflow-scroll absolute top-0 right-0 w-1/3 z-[80] bg-white shadow-lg overscroll-contain">
            <div className="flex items-center justify-between border-b p-4 sticky top-0 z-10 bg-white">
              <h2 className="text-xl">Similar Products</h2>
              <button onClick={toggleOpen}>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="py-1 grid grid-cols-2 gap-1 p-1 bg-gray-100">
              {assetIds?.slice(5, 75).map((productId) => {
                const product = products[productId];

                return (
                  <div className="border rounded-lg col-span-1" key={product?._id}>
                    {product && <ProductCard product={product} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayProducts;
