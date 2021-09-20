import { useEffect } from "react";
import Form from "./Form";
import { useWalletContext } from "../store/reducer";
import { getNodeRpcURL } from "../lib/utils";
import { Connection, PublicKey } from "@solana/web3.js";
import Recieve from "./Recieve";
//New Accordion Template
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSnackbar } from "notistack";
import Divider from "@material-ui/core/Divider";
import { theme } from "../themes";

const DECIMAL_OFFSET = 1000000000;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `3px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
      marginTop: "10",
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export default function DetailedAccordion() {
  const classes = useStyles();
  const { state, dispatch } = useWalletContext();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const publicKeyToDisplay = `${state.pubKey.slice(
    0,
    5
  )}...${state.pubKey.slice(-5)}`;

  //get balance
  useEffect(() => {
    getBalance();
  }, []);
  const getBalance = () => {
    const url = getNodeRpcURL();
    const connection = new Connection(url as string);

    // Create a PublicKey from the input value
    // Call getBalance
    // Set balance using setBalance and DECIMAL_OFFSET
    const publicKey = new PublicKey(state.pubKey);
    connection
      .getBalance(publicKey)
      .then((balance) => {
        dispatch({ type: "getBalance", payload: balance / DECIMAL_OFFSET });
      })
      .catch((err) => {
        enqueueSnackbar(`Could not get balance..`, {
          variant: "error",
          autoHideDuration: 2500,
        });
        console.log(err);
      });
  };
  return (
    <div className={classes.root} style={{ marginTop: 30 }}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              Main Account ({publicKeyToDisplay})<div>{state.balance} SOL</div>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Send or Recieve Token
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Form />
          </div>
          <div className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column} style={{ marginTop: 20 }}>
              <Recieve />
            </div>
            <br />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
