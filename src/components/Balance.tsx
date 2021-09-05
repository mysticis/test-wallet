import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWalletContext } from "../store/reducer";
import { getNodeRpcURL, getAccountExplorerURL } from "../lib/utils";

//import { useGlobalState } from "../context/GlobalState";

const DECIMAL_OFFSET = 1000000000;
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Balance() {
  const { state, dispatch } = useWalletContext();
  const classes = useStyles();

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
        // setBalance(balance / DECIMAL_OFFSET);
        dispatch({ type: "getBalance", payload: balance / DECIMAL_OFFSET });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "error" });
      });
  };
  return (
    <Card className={classes.root} style={{ marginTop: 20, marginBottom: 20 }}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Balance
        </Typography>
        <Typography variant="h3" component="h2">
          {state.balance} SOL
        </Typography>
      </CardContent>
    </Card>
  );
}
