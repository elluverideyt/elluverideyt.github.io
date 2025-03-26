import React, { createContext, useContext, useReducer } from "react";
import { initialState, stateReducer } from "./stateReducer";
import { settingsReducer, initialStoredSettings } from "./settingsReducer";

// APP STATE MANAGEMENT CONTEXT
const AppStateContext = createContext({
  // Creates a context object with our initial state
  state: initialState,
  dispatch: () => {},
});
export const useAppState = () => {
  // Custom hook to use the AppStateContext
  return useContext(AppStateContext);
};

// SETTINGS MANAGEMENT CONTEXT
const SettingsContext = createContext({
  // Creates a context object with our initial settings
  settings: initialStoredSettings,
  dispatch: () => {},
});
export const useSettings = () => {
  // Custom hook to use the SettingsContext
  return useContext(SettingsContext);
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [settings, settingsDispatch] = useReducer(
    settingsReducer,
    initialStoredSettings
  );

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      <SettingsContext.Provider value={[settings, settingsDispatch]}>
        {children}
      </SettingsContext.Provider>
    </AppStateContext.Provider>
  );
};

export default Provider;
