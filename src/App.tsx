import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Paper } from "@material-ui/core";
import NavBar from "./components/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
//import SimpleCard from "./components/Balance";
import Connect from "./components/Connect";
import MyKeypair from "./components/Keypair";
import Balance from "./components/Balance";
import Form from "./components/Form";
import { WalletProvider } from "./store/reducer";
//import LayoutTextFields from "./components/FormControl";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
        light: green[200],
      },
      type: "dark",
    },
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });
  return (
    <WalletProvider>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          <NavBar />
          <Connect />
          <CssBaseline />
          <Container maxWidth="sm">
            <Typography
              component="div"
              /** style={{ backgroundColor: "#cfe8fc", height: "100vh" }}*/
            />
            <MyKeypair />
            <Balance />
            <Form />
          </Container>
        </Paper>
      </ThemeProvider>
    </WalletProvider>
  );
}

export default App;
