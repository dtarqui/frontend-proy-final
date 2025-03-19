import React, { createContext, useReducer, ReactNode } from "react";
import { User } from "../types";

interface GlobalState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialState: GlobalState = {
  user: null,
  setUser: () => {},
};

export const GlobalContext = createContext<GlobalState>(initialState);

const globalReducer = (state: GlobalState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setUser = (user: User | null) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  return (
    <GlobalContext.Provider value={{ user: state.user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
