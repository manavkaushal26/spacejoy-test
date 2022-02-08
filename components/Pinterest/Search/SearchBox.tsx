/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import LottieAnimation from '@components/LottieAnimation';

// import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary, pinterestConfig } from '@utils/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFindYourInpirationContext } from '../usePinterestSearchContext';

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(-50%);

  .input-container {
    width: 100%;
    @media only screen and (min-width: 576px) {
      width: 60%;
    }
    position: relative;
    .pinterest-icon-container {
      position: absolute;
      top: 12%;
      left: 1rem;
      width: 60px;
      height: 60px;
      .pinterest-icon {
        position: absolute;
        width: 100%;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    input {
      width: 100%;
      &::placeholder {
        color: #b3b3b3;
      }
      padding: 2.25rem calc(2rem + 130px) 2.25rem 5.5rem;
      border-radius: 0.7rem;
      outline: none;
      @media screen and (max-width: 768px) {
        padding: 2.25rem calc(2rem + 70px) 2.25rem 2rem;
      }
      border: none;
      font-size: 1.1rem;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px -1px, rgba(0, 0, 0, 0.18) 0px 2px 4px -1px;
    }
    .inputButton {
      border-radius: 0.4rem;
      position: absolute;
      right: 1.5rem;
      top: 25%;
    }
  }
  @media screen and (max-width: 768px) {
    .hide-lg-down {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .hide-lg-up {
      display: none;
    }
  }
`;

const SearchBox: React.FC = () => {
  const router = useRouter();
  const isClicked = useRef(false);

  const { searchText, loading, error, success } = useFindYourInpirationContext();
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [domain, setDomain] = useState<string>();

  useEffect(() => {
    if (window) {
      setDomain(window.location.origin);
    }
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e?.currentTarget?.value);
  };

  const isUnsupportedUrl = useMemo(() => {
    if (/pin\.it/.test(searchQuery)) {
      return true;
    }

    return false;
  }, [searchQuery]);

  const isValidHttpUrl = (query) => {
    let url;

    try {
      url = new URL(query);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const isValidUrl = useMemo(() => {
    return isValidHttpUrl(searchQuery);
  }, [searchQuery]);

  const initiateSearch = () => {
    if (
      searchQuery &&
      searchText !== searchQuery &&
      !(searchQuery === '' || isUnsupportedUrl || !searchQuery || !isValidUrl)
    ) {
      router.push({
        pathname: '/pinterest/search',
        query: {
          searchQuery,
        },
      });
      // PushEvent({
      //   category: 'Added Pinterest Link',
      //   action: `Added Pinterest Link | ${searchQuery}`,
      //   label: `Added Pinterest Link`,
      // });
      isClicked.current = true;
    }
  };

  const handleKeyDown = (e) => {
    if (!(searchQuery === '' || isUnsupportedUrl || !searchQuery || !isValidUrl))
      if (e.code === 'Enter') initiateSearch();
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        // TODO push event goes here
        isClicked.current = false;
      }
    }
  }, [loading, error, isClicked.current]);

  useEffect(() => {
    if (!loading) {
      if (success) {
        // TODO push event goes here
        isClicked.current = false;
      }
    }
  }, [loading, success, isClicked.current]);

  return (
    <div className="col-span-3 lg:col-span-2">
      <div className="flex flex-col gap-y-2 items-center px-8 py-12 text-center rounded-lg bg-spj-pinterest">
        <div className="mb-2 text-xl font-bold">Shop home decor from your pins</div>
        <div className="text-lg text-gray-500">
        Choose a Pinterest board to select a pin
        </div>
        <div>
          <a
            className="text-center text-white pinterest-login bg-[#e60023] p-2 gap-2 flex items-center justify-between transition-shadow  mt-4 rounded-lg hover:shadow-lg"
            href={`https://www.pinterest.com/oauth/?client_id=${pinterestConfig.appId}&redirect_uri=${domain}/pinterest/oauth&response_type=code&scope=boards:read,pins:read,user_accounts:read`}
          >
            <div className="relative w-8 h-8 aspect-1">
              <Image
                alt="pinterest-icon"
                className="pinterest-icon"
                layout="fill"
                objectFit="contain"
                src={`${cloudinary.baseDeliveryURL}/ar_1,c_pad,q_80/v1634813240/web/pinterest-integration/icons/icon-pinterest_mw3pqw.svg`}
              />
            </div>
            <div>Connect your board</div>
          </a>
        </div>
      </div>

      <div className="flex justify-center -my-6 text-center ">
        <span className="z-10 p-5 font-bold bg-white border-2 rounded-lg border-gray-200/75">OR</span>
      </div>

      <div className="relative flex flex-col items-center px-8 py-12 rounded-lg bg-spj-pinterest gap-y-2">
        <div className="mb-2 text-xl font-bold">Connect any public Pinterest board</div>
        {/* <div className="text-lg text-center text-gray-500">
          Paste a public pinterest board link to view similar products!
        </div> */}
        <div className="w-full mt-4 text-center">
          <div className="relative w-full p-1 mx-auto">
            <input
              className="inline-block w-full p-6 pr-40 placeholder-gray-400 border rounded-lg shadow-lg"
              onChange={handleChange}
              defaultValue={searchQuery}
              onKeyDown={handleKeyDown}
              placeholder="Eg: https://in.pinterest.com/spacejoyapp/spacejoy-recommendations/"
              autoComplete="off"
              name="search"
            />

            <div className="absolute top-4 right-4">
              <button
                className="px-8 py-3 text-white capitalize bg-black rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={searchQuery === '' || isUnsupportedUrl || !searchQuery || !isValidUrl}
                onClick={initiateSearch}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
