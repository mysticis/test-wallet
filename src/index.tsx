import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from "./store/reducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...green,
      ...(mode === "dark" && {
        main: green[300],
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: grey[900],
        paper: grey[900],
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: green[900],
            secondary: green[800],
          }
        : {
            primary: "#fff",
            secondary: grey.A700,
          }),
    },
  },
});

const darkModeTheme = createTheme(getDesignTokens("dark"));
ReactDOM.render(
  <WalletProvider>
    <ThemeProvider theme={darkModeTheme}>
      <App />
    </ThemeProvider>
  </WalletProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
