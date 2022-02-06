import fetcher from '@utils/fetcher';
import { useLayoutEffect, useState } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

let store;

const initialState = {
  loading: false,
  cart: {
    cartItems: {},
    invoiceData: {},
  },
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
      set({
        cart: cartData,
      });
    },
    setLoading: (val) => {
      set({
        loading: val,
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

      set({
        cart: tmpCartData,
      });
    },
  }));
};

export function useCreateStore(initialState) {
  const [cartData, setCartData] = useState(null);
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
      }
    })();
  }, []);

  return () => store;
}
