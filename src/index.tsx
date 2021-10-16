import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from "./store/reducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...green,
      ...(mode === "dark" && {
        main: grey[50],
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: green[700],
        paper: grey[50],
      },
    }),
    text: {
      ...(mode === "dark"
        ? {
            primary: "#fff",
            secondary: grey[400],
          }
        : {
            primary: "#fff",
            secondary: grey.A700,
          }),
    },
  },
});

const darkModeTheme = createTheme(getDesignTokens("dark"));
const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <WalletProvider>
      <ThemeProvider theme={darkModeTheme}>
        <App />
      </ThemeProvider>
    </WalletProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
