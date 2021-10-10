import { useReducer, createContext, ReactNode, useContext } from "react";
import { secretKey } from "../keys.config";
import { Keypair } from "@solana/web3.js";
const key = Keypair.fromSecretKey(secretKey);
const address = key.publicKey.toString();

const initialState: IState = {
  pubKey: address,
  balance: 0,
  severity: "",
  isFetching: null,
  txSignature: undefined,
  message: "",
};

interface IState {
  pubKey: string;
  balance: number;
  severity: string;
  isFetching: null | boolean;
  txSignature: string | undefined;
  message: string;
}

export type WalletAction =
  | { type: "getAdress" }
  | { type: "getBalance"; payload: number }
  | { type: "transfer"; payload: number }
  | { type: "setTxSignature"; payload: string | undefined }
  | { type: "isFetching"; payload: boolean }
  | { type: "severity"; payload: { severity: string; message: string } }
  | { type: "fund"; payload: { type: string; message: string } };

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
        severity: action.payload.type,
        message: action.payload.message,
      };
    case "severity":
      return {
        ...state,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    case "transfer":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "isFetching":
      return {
        ...state,
        isFetching: action.payload,
      };
    case "setTxSignature":
      return {
        ...state,
        txSignature: action.payload,
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
