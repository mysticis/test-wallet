import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider, useSnackbar } from "notistack";
import { WalletProvider } from "./store/reducer";
import { theme } from "./themes";
ReactDOM.render(
  <WalletProvider>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </WalletProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
