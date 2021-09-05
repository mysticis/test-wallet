import React, { useReducer, createContext, ReactNode, useContext } from "react";
import { secretKey } from "../keys.config";
import { Keypair } from "@solana/web3.js";

const key = Keypair.fromSecretKey(secretKey);
const address = key.publicKey.toString();

const initialState: IState = {
  pubKey: address,
  balance: 0,
  error: "",
  success: false,
};

interface IState {
  pubKey: string;
  balance: number;
  error: string;
  success: boolean;
}

export type WalletAction =
  | { type: "getAdress" | "success" | "error" | "fund" }
  | { type: "getBalance"; payload: number }
  | { type: "transfer"; payload: number };

export type Dispatch = (action: WalletAction) => void;

export type State = typeof initialState;

const WalletContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const walletReducer = (state: IState, action: WalletAction) => {
  switch (action.type) {
    case "getAdress":
      return {
        ...state,
        pubKey: address,
      };
    case "getBalance":
      return {
        ...state,
        balance:
          state.balance === 0 ? state.balance + action.payload : action.payload,
      };
    case "fund":
      return {
        ...state,
        success: !state.success,
      };
    case "error":
      return {
        ...state,
        error: "Error funding!!",
      };
    case "transfer":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context)
    throw new Error("UseWalletContext must be used inside a WalletProvider!");

  return context;
};
