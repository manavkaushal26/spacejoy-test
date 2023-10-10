import fetcher from '@utils/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const initialState = {
  list: {
    '0': [],
  },
  currentPage: 0,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_LIST': {
      const { payload: { data, currentPage = 0 } = [] } = action;

      return {
        ...state,
        list: {
          ...state.list,
          [currentPage]: data,
        },
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    }
    case 'SET_LOADING_EXPLICIT': {
      return {
        ...state,
        isFetching: action.value,
      };
    }
    case 'UPDATE_CURRENT_PAGE': {
      const { payload } = action;

      return {
        ...state,
        currentPage: payload,
      };
    }
    case 'RESET_STATE': {
      return {
        ...initialState,
      };
    }
  }

  return state;
};

const fetchMoreData = async (api, skip, limit) => {
  // TODO: Change var names
  const { url, method, payload } = api;

  const queryParam = `?limit=${limit}&skip=${skip}`;
  const endPoint = `${url}${queryParam}`;

  try {
    const res = await fetcher({ endPoint, method, ...(method === 'POST' && { body: { ...payload } }) });
    const {
      data: { list = [], data = [] },
      statusCode,
    } = res;

    if (statusCode <= 301) {
      return list.concat(data);
    } else {
      toast.error(res?.data?.message || 'Something went wrong');
    }
  } catch (e) {
    console.error(e?.message);
  }
};

const useGenericPagination = (api, initialData, totalRecords, paginationButtonCount, pageSize, options = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentBtnWindow, setCurrentBtnWindow] = useState([]);
  const { onButtonClick } = options as { onButtonClick: () => void };
  const router = useRouter();
  const firstLoad = useRef(true);
  const { isFetching, currentPage, list } = state;

  useEffect(() => {
    if (initialData && initialData?.length) {
      dispatch({ type: 'ADD_TO_LIST', payload: { data: initialData } });
    }
  }, [initialData]);

  const paginationBtnNav = (buttonIndex) => {
    // button click updates router only
    const currentQueryParam = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...currentQueryParam, page: parseInt(buttonIndex, 10) + 1 },
      },
      undefined,
      { shallow: true }
    );
    if (onButtonClick) {
      onButtonClick();
    }
  };

  //read query params
  useEffect(() => {
    const {
      query: { page = 0 },
    } = router;
    const stepNumber = parseInt(page as string, 10) - 1;
    dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: Math.max(stepNumber, 0) });
  }, [router]);

  async function fetchData(...args) {
    const newData = await fetchMoreData.apply(null, [...args]);
    dispatch({ type: 'ADD_TO_LIST', payload: { data: newData, currentPage } });
    dispatch({ type: 'SET_LOADING_EXPLICIT', value: false });
  }

  useEffect(() => {
    if (!(state.currentPage === 0 && initialData && initialData.length)) {
      const dataAtIndex = list[currentPage];
      if (!dataAtIndex || dataAtIndex?.length !== pageSize) {
        dispatch({ type: 'SET_LOADING' });
        fetchData(api, currentPage * pageSize, pageSize);
      }
    }
    //calculate max buttons to show
  }, [state.currentPage]);

  useEffect(() => {
    if (!firstLoad.current) {
      dispatch({ type: 'RESET_STATE' });
      fetchData(api, currentPage * pageSize, pageSize);
      dispatch({ type: 'SET_LOADING' });
    } else {
      firstLoad.current = false;
    }
  }, [api.payload]);

  useEffect(() => {
    if (currentPage === 0 && list[currentPage]?.length < pageSize) {
      setCurrentBtnWindow([]);
    } else {
      const numOfPages = Math.ceil(totalRecords / pageSize);
      let maxLeft = state.currentPage - Math.floor(paginationButtonCount / 2);
      let maxRight = currentPage + Math.floor(paginationButtonCount / 2);

      if (maxLeft < 0) {
        maxLeft = 0;
        maxRight = paginationButtonCount - 1;
      }
      if (maxRight > numOfPages) {
        maxLeft = numOfPages - (paginationButtonCount - 1);
        maxRight = numOfPages;
        if (maxLeft < 0) {
          maxLeft = 0;
        }
      }
      const buttons = [];

      const doesMoreDataExist = list[currentPage]?.length && list[currentPage]?.length === pageSize;

      buttons.push({
        index: currentPage - 1,
        label: 'Prev',
        onClick: paginationBtnNav,
        disabled: currentPage === 0,
      });
      for (let i = maxLeft; i <= maxRight; i++) {
        buttons.push({
          index: i,
          onClick: paginationBtnNav,
          label: i + 1,
          active: state.currentPage === i,
          disabled: i > currentPage && !doesMoreDataExist,
        });
      }

      buttons.push({
        index: currentPage + 1,
        label: 'Next',
        onClick: paginationBtnNav,
        disabled: maxRight === numOfPages || !doesMoreDataExist,
      });

      setCurrentBtnWindow(buttons);
    }
  }, [currentPage, list]);

  return {
    isFetching,
    buttons: currentBtnWindow,
    currentRenderList: state?.list[currentPage] || [],
  };
};

export default useGenericPagination;
