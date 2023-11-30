import { createContext, useContext, useState } from 'react';

const CenteralContext = createContext();

export const CenteralContextProvider = ({ children }) => {
  const [notifs, setNotifs] = useState(0);

  const updateNotifs = (newValue) => {
    setNotifs(newValue);
  };

  return (
    <CenteralContext.Provider value={{ notifs, updateNotifs }}>
      {children}
    </CenteralContext.Provider>
  );
};

export const useCenteralContext = () => {
  return useContext(CenteralContext);
};
