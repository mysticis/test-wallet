import NavBar from "./components/AppBar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Loading from "./components/Loading";
import { useWalletContext } from "./store/reducer";
import { ToastContainer } from "react-toastify";
import ControlledAccordions from "./components/ControlledAccordion";
import { injectStyle } from "react-toastify/dist/inject-style";
import { green } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const { state } = useWalletContext();
  //console.log(state.pubKey);
  const explorerUrl = `https://explorer.solana.com/tx/${state.txSignature}?cluster=devnet`;
  return (
    <Paper style={{ height: "100vh" }}>
      <NavBar />

      <CssBaseline />
      <Container maxWidth="sm">
        <ControlledAccordions />

        {state.isFetching && <Loading />}
        <div style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">
            {state.txSignature && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: `${green.A400}` }}
              >
                View on Solana Explorer
              </a>
            )}
          </Typography>
          <ToastContainer />
        </div>
      </Container>
    </Paper>
  );
}

export default App;
