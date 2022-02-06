import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ViewingModeContext = React.createContext([]);

const ViewingModeContextProvider: React.FC<{ mode: string }> = ({ children, mode = 'view' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const router = useRouter();

  useEffect(() => {
    const {
      query: { cid = [] },
    } = router;
    const [mode] = cid as string[];
    if (!mode) {
      setCurrentMode('view');
    } else {
      setCurrentMode(mode);
    }
  }, [router?.asPath]);

  const updateRoute = (newMode) => {
    const {
      query: { cid },
    } = router;
    if (cid?.length) {
      const params = [...(cid as string[])];

      params.splice(0, 1, newMode);
      router.push(
        {
          pathname: `/${router?.asPath?.split('/')[1]}/${params[0]}${params[1] && `/${params[1]}`}`,
        },
        undefined,
        { shallow: true }
      );
    } else {
      setCurrentMode(newMode);
    }
  };
  return (
    <ViewingModeContext.Provider value={[currentMode, setCurrentMode, updateRoute]}>
      {children}
    </ViewingModeContext.Provider>
  );
};

export { ViewingModeContext, ViewingModeContextProvider };
