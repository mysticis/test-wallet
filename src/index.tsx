import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from "./store/reducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, amber } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[900],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
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
