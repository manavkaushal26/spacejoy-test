import { reactLocalStorage } from '@utils/localstorage';
import quizQuestions from '@utils/Mocks/quizQuestions';
import topCollages from '@utils/Mocks/topCollages';
import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

let store;

const initialState = {
  loading: false,

  offers: {
    product: {
      coupons: [],
    },
    retailer: {
      coupons: [],
    },
  },
  tagTypes: {},
  themeFilters: {
    themes: [],
  },
  // WIP move to different store
  roomData: {},
  quizData: {},
  rooms: [...topCollages?.list],
  userRoomSelection: [],
  questions: { ...quizQuestions },
  designCart: {
    cartItems: {},
    invoiceData: {},
    count: 0,
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

    // WIP multi package flow
    resetUserSelection: async () => {
      await reactLocalStorage.remove('userRoomSelection');
      await reactLocalStorage.remove('designQuiz');
      set({
        questions: { ...quizQuestions },
        userRoomSelection: [],
      });
    },
    removeRoomWithoutPackage: async () => {
      const currentUserSelections = [...get()?.userRoomSelection];
      if (currentUserSelections?.length) {
        const updated = currentUserSelections.filter((item) => typeof item?.packageSelection !== 'undefined');

        await reactLocalStorage.setObject('userRoomSelection', updated);
        set({
          userRoomSelection: updated,
        });
      }
    },

    getUserSelectionData: () => {
      // create payload for
      const currentUserSelections = [...get()?.userRoomSelection];
      const currentQuestions = get()?.questions;
      const groupedSelections = currentUserSelections?.reduce((acc, curr) => {
        if (!acc[curr?.name]) {
          acc[curr?.name] = [];
        }
        acc[curr?.name].push(curr);

        return acc;
      }, {});
      const roomData = Object.keys(groupedSelections)?.map((item, index) => {
        return {
          question: 'roomType',
          answer: item,
          quantity: groupedSelections[item]?.length,
          entry: index + 1,
          packageSelection: groupedSelections[item]?.map((room, idx) => {
            return {
              roomUGCName: room?.displayName,
              question: 'packageName',
              entry: idx,
              packageName: room?.packageSelection?.name,
              packageId: room?.packageSelection?.id,
            };
          }),
        };
      });

      const quizData = Object.keys(currentQuestions)?.reduce((acc, curr) => {
        const { answers, question: userQuestion } = currentQuestions[curr];
        acc?.push({
          question: `${userQuestion?.prefix} ${userQuestion?.suffix}`,
          answer: answers?.filter((item) => item?.selected)[0]?.answer || '',
        });

        return acc;
      }, []);

      const payload = {
        quizData,
        roomData,
      };

      return payload;
    },
    updateQuizSelection: async (stepNumber, answerId) => {
      const questions = { ...get()?.questions };

      const updatedQuizObject = {
        ...questions,
        [stepNumber]: {
          ...questions[stepNumber],
          answers: questions[stepNumber]?.answers?.map((item) => {
            if (item?.id === answerId) {
              return { ...item, selected: true };
            }

            return { ...item, selected: false };
          }),
        },
      };
      await reactLocalStorage.setObject('designQuiz', updatedQuizObject);
      set({
        questions: updatedQuizObject,
      });
    },
    deleteRoom: async (itemId) => {
      const currentSelections = [...get()?.userRoomSelection];

      var index = currentSelections.findIndex(function (o) {
        return o.itemId === itemId;
      });
      if (index !== -1) {
        currentSelections.splice(index, 1);
      }

      //update local storage
      await reactLocalStorage.setObject('userRoomSelection', currentSelections);
      set({
        userRoomSelection: currentSelections,
      });
    },
    addPackageToRoom: async (itemId, packageDetails) => {
      const currentSelections = get()?.userRoomSelection;
      const currentQuestions = get()?.questions;

      if (!itemId) {
        // update last package in room
        // find last room without assigned package
        let index;
        for (let i = currentSelections?.length - 1; i >= 0; i--) {
          if (!currentSelections[i]?.packageSelection) {
            index = i;
            break;
          }
        }
        currentSelections[index] = { ...currentSelections[index], packageSelection: packageDetails };

        //update local storage
        await reactLocalStorage.setObject('userRoomSelection', currentSelections);
        const maxQuizStep = Math.max.apply(
          null,
          Object.keys(quizQuestions).map((item) => parseInt(item, 10))
        );
        set({
          userRoomSelection: currentSelections,
          questions: {
            ...currentQuestions,
            [maxQuizStep]: {
              ...currentQuestions[maxQuizStep],
              answers: currentSelections?.map((item) => {
                return {
                  id: item?.itemId,
                  answer: item?.displayName,
                  selected: false,
                };
              }),
            },
          },
        });
      } else {
        const updatedPackageList = currentSelections.map((item) => {
          if (item?.itemId === itemId) {
            return { ...item, packageSelection: packageDetails };
          }

          return { ...item };
        });

        //update local storage
        await reactLocalStorage.setObject('userRoomSelection', updatedPackageList);
        const maxQuizStep = Math.max.apply(
          null,
          Object.keys(quizQuestions).map((item) => parseInt(item, 10))
        );
        set({
          userRoomSelection: updatedPackageList,
          questions: {
            ...currentQuestions,
            [maxQuizStep]: {
              ...currentQuestions[maxQuizStep],
              answers: updatedPackageList?.map((item) => {
                return {
                  id: item?.itemId,
                  answer: item?.displayName,
                  selected: false,
                };
              }),
            },
          },
        });
      }
    },

    createRoom: async () => {
      const currentSelections = get()?.userRoomSelection;
      const roomsList = get()?.rooms;
      const selectedRoom = roomsList?.filter((item) => item?.selected)[0];
      let userSelections = [];

      // format room name
      const currentRoomsOfType = currentSelections?.filter((item) => item?.name === selectedRoom?.name)?.length;

      if (currentRoomsOfType) {
        userSelections = [
          ...currentSelections,
          {
            ...selectedRoom,
            displayName: `${selectedRoom?.name} ${currentRoomsOfType}`,
            itemId: `${userSelections?.length}-${Math.random()}`,
          },
        ];
        await reactLocalStorage.setObject('userRoomSelection', userSelections);
        set({
          userRoomSelection: userSelections,
        });
      } else {
        userSelections = [
          ...currentSelections,
          { ...selectedRoom, displayName: selectedRoom?.name, itemId: `${userSelections?.length}-${Math.random()}` },
        ];
        await reactLocalStorage.setObject('userRoomSelection', userSelections);
        set({
          userRoomSelection: userSelections,
        });
      }
    },
    resetRoomsList: () => {
      set({
        rooms: [...topCollages?.list],
      });
    },
    updateRoomSelection: (roomId) => {
      const roomsList = get()?.rooms;
      const updatedRoomSelection = roomsList?.map((item) => {
        if (item?._id === roomId) {
          return { ...item, selected: true };
        }

        return { ...item, selected: false };
      });
      set({
        rooms: updatedRoomSelection,
      });
    },
    //
    setTags: (tagTypes) => {
      set({
        tagTypes,
      });
    },
    saveThemeFilters: (themeData) => {
      set({
        themeFilters: {
          themes: themeData,
        },
      });
    },
    updateActiveTagType: (tagTypeId) => {
      const tagTypeData = get()?.tagTypes;
      const updatedTypeData = {
        ...tagTypeData,
        [tagTypeId]: {
          ...tagTypeData[tagTypeId],
          selected: !tagTypeData[tagTypeId]?.selected,
        },
      };
      set({
        tagTypes: { ...updatedTypeData },
      });
    },

    updateTagData: (tagTypeId, tagResponse) => {
      const tagData = get().tagTypes;
      const updatedTagData = {
        ...tagData,
        [tagTypeId]: {
          ...tagData[tagTypeId],
          tags: tagResponse,
        },
      };
      set({
        tagTypes: {
          ...updatedTagData,
        },
      });
    },

    setProductOffers: (productOffers) => {
      const offers = get().offers;
      const updatedOffers = {
        ...offers,
        product: {
          ...offers?.product,
          coupons: productOffers,
        },
      };
      set({
        offers: updatedOffers,
      });
    },
    setBrandOffers: (brandOffers) => {
      const offers = get().offers;
      const updatedOffers = {
        ...offers,
        retailer: {
          ...offers?.retailer,
          coupons: brandOffers,
        },
      };
      set({
        offers: updatedOffers,
      });
    },

    setLoading: (val) => {
      set({
        loading: val,
      });
    },
  }));
};

export function useCreateStore(initialState) {
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
    (async () => {
      const val = await reactLocalStorage.getObject('userRoomSelection', []);

      const questions = await reactLocalStorage.getObject('designQuiz');
      const combined = Object.keys(quizQuestions).reduce((acc, curr) => {
        if (questions[curr]) {
          acc[curr] = questions[curr];
        } else {
          acc[curr] = quizQuestions[curr];
        }

        return acc;
      }, {});

      const maxQuizStep = Math.max.apply(
        null,
        Object.keys(quizQuestions).map((item) => parseInt(item, 10))
      );

      const qWithA = {
        ...combined,
        [maxQuizStep]: {
          ...combined[maxQuizStep],
          answers: val?.map((item) => {
            return {
              answer: item?.displayName,
              selected: false,
              id: item?.itemId,
            };
          }),
        },
      };

      store.setState({
        ...store.getState(),
        ...initialState,
        userRoomSelection: Array.isArray(val) ? val : [],
        questions: qWithA,
      });
    })();
  }, [initialState]);

  return () => store;
}
