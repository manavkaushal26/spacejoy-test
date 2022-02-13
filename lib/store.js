import useLocalStorage from '@hooks/useLocalStorage';
import fetcher from '@utils/fetcher';
import { reactLocalStorage } from '@utils/localstorage';
import { useLayoutEffect, useState } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

let store;

const initialState = {
  loading: false,
  cart: {
    cartItems: {},
    invoiceData: {},
    count: 0,
  },
};

const objectWithoutKey = (object, objectKey) => {
  const empty = {};
  for (let key in object) {
    if (key !== objectKey) {
      empty[key] = object[key];
    }
  }

  return empty;
};

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create((set, get) => ({
    ...initialState,
    ...preloadedState,

    updateCart: (cartData) => {
      reactLocalStorage.setObject('userCart', cartData);
      set({
        cart: cartData,
      });
    },
    setLoading: (val) => {
      set({
        loading: val,
      });
    },
    removeProductFromCart: (productId, retailerId) => {
      const cartData = get().cart;
      //remove product
      // console.log('in this block', cartData, cartData?.cartItems[retailerId]?.products[productId]?.quantity);
      const cartWithRemovedProduct = {
        ...cartData,
        count: cartData?.count - cartData?.cartItems[retailerId]?.products[productId]?.quantity,
        cartItems: {
          ...cartData?.cartItems,
          [retailerId]: {
            ...cartData?.cartItems[retailerId],
            products: objectWithoutKey({ ...cartData?.cartItems[retailerId].products }, productId),
          },
        },
      };
      // check if retailer is empty
      const finalCart = Object.keys(cartWithRemovedProduct?.cartItems[retailerId]?.products)?.length
        ? { ...cartWithRemovedProduct }
        : {
            ...cartWithRemovedProduct,
            cartItems: objectWithoutKey({ ...cartWithRemovedProduct?.cartItems }, retailerId),
          };
      reactLocalStorage.setObject('userCart', finalCart);
      set({
        cart: finalCart,
      });
    },
    modifyCart: (product, qty, type) => {
      const cartData = get().cart;

      const {
        retailer: { _id: brand },
      } = product;
      const tmpCartData = { ...cartData };

      if (!tmpCartData?.cartItems[brand]) {
        tmpCartData.cartItems[brand] = {
          products: {
            [product._id]: product,
          },
          name: product?.retailer?.name,
        };
      } else if (!tmpCartData.cartItems[brand].products[product._id]?._id) {
        tmpCartData.cartItems[brand].products[product._id] = product;
      }
      const tmpProductData = tmpCartData?.cartItems[brand]?.products[product._id];

      if (type === 'add') {
        tmpCartData.count += qty;
        tmpProductData.quantity = (tmpProductData?.quantity || 0) + qty;
      } else {
        const qtyDiff = (tmpProductData.quantity || 0) - qty;
        tmpCartData.count = tmpCartData.count - qtyDiff;
        tmpProductData.quantity = qty;
      }
      reactLocalStorage.setObject('userCart', tmpCartData);
      set({
        cart: tmpCartData,
      });
    },
  }));
};

export function useCreateStore(initialState) {
  const [cartData, setCartData] = useState(null);

  const [userCart, setCart] = useLocalStorage('userCart', {});
  const { cartItems = {} } = userCart;

  const updatedCart = Object.keys(cartItems)?.length ? userCart : { cartItems: {}, invoiceData: {}, count: 0 };

  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);

  // And if initialState changes, then merge states in the next render cycle.
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    (async () => {
      store.setState({
        ...store.getState(),
        cart: { ...updatedCart },
        loading: true,
      });

      const res = await fetcher({ endPoint: '/v1/cart', method: 'GET' });
      const { data, statusCode } = res;
      initialState.loading = false;

      if (statusCode < 300) {
        setCartData(data);
        store.setState({
          ...store.getState(),
          cart: { ...data },
          loading: false,
        });
      } else {
        store.setState({
          ...store.getState(),

          loading: false,
        });
      }
    })();
  }, []);

  return () => store;
}
