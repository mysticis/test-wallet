import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { green } from "@mui/material/colors";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useWalletContext } from "../store/reducer";
import { getNodeRpcURL, getNodeWsURL } from "../lib/utils";
import { secretKey } from "../keys.config";
import Typography from "@mui/material/Typography";
import * as bs58 from "bs58";

function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [addressError, setAddressError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const { state, dispatch } = useWalletContext();

  //transfer function
  const transfer = () => {
    const amountNumber = parseFloat(amount);
    const decoded = bs58.decode(address);
    if (isNaN(amountNumber)) {
      setAmountError(true);
      toast.error("Amount entered is not a number", {
        position: "top-center",
        autoClose: 9000,
      });
      return;
    }
    if (typeof address === "string" && decoded.length !== 32) {
      setAddressError(true);
      toast.error("Invalid public key input!", {
        position: "top-center",
        autoClose: 9000,
      });

      return;
    }
    setAmountError(false);
    setAddressError(false);
    const url = getNodeRpcURL();
    const connection = new Connection(url as string, {
      wsEndpoint: getNodeWsURL(),
    });

    const fromPubKey = new PublicKey(state.pubKey);
    const toPubKey = new PublicKey(address);

    const instructions = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: toPubKey,
      lamports: amountNumber,
    });

    const signers = [
      {
        publicKey: fromPubKey,
        secretKey: secretKey,
      },
    ];

    // Create a transaction
    // Add instructions
    // Call sendAndConfirmTransaction
    // On success, call setTxSignature and setFetching
    const transaction = new Transaction().add(instructions);
    // setTxSignature(null);
    dispatch({ type: "setTxSignature", payload: undefined });
    dispatch({ type: "isFetching", payload: true });
    sendAndConfirmTransaction(connection, transaction, signers)
      .then((signature) => {
        dispatch({ type: "setTxSignature", payload: signature });
        dispatch({ type: "isFetching", payload: false });
        toast.success("Transaction was successful!", {
          position: "top-right",
          autoClose: 7000,
        });
        setAddress("");
        setAmount("");
        console.log(signature);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "isFetching", payload: false });
        toast.error("Transaction failed!", {
          position: "top-right",
          autoClose: 6000,
        });
      });
    console.log(address, amount);

    setOpen(false);
  };

  const handleClickOpen = () => {
    const burnAddress = Keypair.generate();
    const destinationAddress = burnAddress.publicKey.toString();
    console.log(destinationAddress);
    setOpen(true);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(e.currentTarget.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.currentTarget.value);
  };

  const handleClose = () => {
    console.log(address, amount);
    setOpen(false);
    setAddress("");
    setAmount("");
  };
  // const explorerUrl: string = getTxExplorerURL(state.txSignature as string);
  //const explorerUrl = `https://explorer.solana.com/tx/${state.txSignature}?cluster=devnet`;
  return (
    <div>
      {state.isFetching === null ? (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          startIcon={<SendIcon />}
          style={{ fontFamily: "Quicksand", color: green.A700 }}
        >
          Send{" "}
        </Button>
      ) : state.isFetching === true ? (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          disabled
          startIcon={<SendIcon />}
          style={{ fontFamily: "Quicksand", color: green.A700 }}
        >
          Send
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          startIcon={<SendIcon />}
          style={{ fontFamily: "Quicksand", color: green.A700 }}
        >
          Send
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography
            style={{ fontFamily: "Quicksand", color: `${green.A700}` }}
          >
            {" "}
            Paste Destination address{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ fontFamily: "Quicksand", color: `${green.A400}` }}
          >
            Verify that the address is correct as funds sent to the wrong
            address might not be recovered.
          </DialogContentText>
          <TextField
            color={addressError ? "error" : "success"}
            autoFocus
            id="outlined-full-width"
            label="Sol Devnet Address"
            required
            style={{ margin: 8, fontFamily: "Quicksand" }}
            placeholder="Sol Devnet Address"
            helperText="Address!"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            color={amountError ? "error" : "success"}
            label="Amount"
            style={{ margin: 8, fontFamily: "Quicksand" }}
            required
            placeholder="1000000000 lamport = 1 SOL"
            helperText="Amount!"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ fontFamily: "Quicksand", color: green.A700 }}
          >
            Cancel
          </Button>
          <Button
            onClick={transfer}
            startIcon={<SendIcon />}
            variant="outlined"
            style={{ fontFamily: "Quicksand", color: green.A700 }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
