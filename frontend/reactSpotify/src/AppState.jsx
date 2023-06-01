import { createContext, useState } from "react";

export const AppStateContext = createContext();
/**
 *
 * @param {*} param0 allows for context to be used and for children components to access a global version of state to allow use of back pages
 * @returns
 */
export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({});

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};
