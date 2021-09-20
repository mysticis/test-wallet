import { Paper } from "@material-ui/core";
import NavBar from "./components/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Loading from "./components/Loading";
import Connect from "./components/Connect";
import { useWalletContext } from "./store/reducer";
import Accordion from "./components/Accordion";
import { useSnackbar } from "notistack";
//import LayoutTextFields from "./components/FormControl";
import { theme } from "./themes";

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useWalletContext();
  console.log(state.pubKey);
  const explorerUrl = `https://explorer.solana.com/tx/${state.txSignature}?cluster=devnet`;
  return (
    <Paper style={{ height: "100vh" }}>
      <NavBar />
      <Connect />
      <CssBaseline />
      <Container maxWidth="sm">
        <Accordion />
        {state.isFetching && <Loading />}
        {state.isFetching &&
          enqueueSnackbar(`Sending Tokens...`, {
            variant: "success",
            autoHideDuration: 2500,
          })}
        <div style={{ marginTop: 20 }}>
          {state.txSignature
            ? enqueueSnackbar(`Transaction Successful`, {
                variant: "success",
                autoHideDuration: 2500,
              })
            : ""}
          <Typography variant="subtitle1" color="primary">
            {state.txSignature && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer"
                color={theme.palette.primary.main}
              >
                View on Solana Explorer
              </a>
            )}
          </Typography>
        </div>
      </Container>
    </Paper>
  );
}

export default App;
