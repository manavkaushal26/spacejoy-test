// import { PushEvent } from '@utils/analyticsLogger';
import React, { createContext, useEffect, useState } from 'react';

export interface PinType {
  id: string;
  images: {
    '567x': {
      url: string;
    };
  };
}

export interface FindYourInspirationContext {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  pinList: PinType[];
  initiateSearch: () => Promise<void>;
  loading: boolean;
  error: boolean;
  success: boolean;
}
const FindYourInspirationContext = createContext<FindYourInspirationContext>({
  imgSrc: '',
  setImgSrc: () => {
    return;
  },
  setSearchText: () => {
    return;
  },
  searchText: '',
  pinList: [],
  initiateSearch: async () => {
    return;
  },
  loading: true,
  error: false,
  success: false,
});

const FindYourInspirationContextProvider: React.FC<{ searchQuery: string }> = ({ children, searchQuery }) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [searchText, setSearchText] = useState<string>(searchQuery);
  const [pinList, setPinList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getBoardData = async (url) => {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setSuccess(true);
          setPinList(json.data.pins);
          // PushEvent({
          //   category: 'Connect with board',
          //   action: `Success | Connect with board`,
          //   label: 'Connect with board',
          // });
          setError(false);
        });
    } catch (err) {
      setError(true);
      // PushEvent({
      //   category: 'Connect with board',
      //   action: `Failure | Connect with board`,
      //   label: 'Connect with board',
      // });
      // console.log(err);
    }
  };

  const initiateSearch = async () => {
    setLoading(true);
    setError(false);
    setPinList([]);
    if (searchText) {
      let validTerm = searchText.replace(/[a-zA-Z:///]*\.pinterest\.com\//, '').replace(/\/\?[a-z].*/, '');
      if (validTerm[validTerm.length - 1] === '/') {
        validTerm = validTerm.slice(0, validTerm.length - 1);
      }
      await getBoardData(`https://api.pinterest.com/v3/pidgets/boards/${validTerm}/pins/?jsonp`);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (searchText) {
      initiateSearch();
    }
  }, [searchText]);

  useEffect(() => {
    if (searchQuery) {
      setSearchText(searchQuery);
    }
  }, [searchQuery]);

  return (
    <FindYourInspirationContext.Provider
      value={{
        imgSrc,
        setImgSrc,
        setSearchText,
        searchText,
        pinList,
        initiateSearch,
        loading,
        error,
        success,
      }}
    >
      {children}
    </FindYourInspirationContext.Provider>
  );
};

export const useFindYourInpirationContext = (): FindYourInspirationContext => {
  return { ...React.useContext<FindYourInspirationContext>(FindYourInspirationContext) };
};

export default FindYourInspirationContextProvider;
