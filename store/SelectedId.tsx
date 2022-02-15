import React, { useState } from 'react';

const SelectedIdContext = React.createContext([]);

const SelectedIdContextProvider: React.FC = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [swapState, setSwapState] = useState<boolean>(false);
  
  return (
    <SelectedIdContext.Provider value={[selectedId, setSelectedId, { swapState, setSwapState }]}>
      {children}
    </SelectedIdContext.Provider>
  );
};

export { SelectedIdContext, SelectedIdContextProvider };
