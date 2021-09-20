import { createTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      light: green[200],
    },
    type: "light",
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
