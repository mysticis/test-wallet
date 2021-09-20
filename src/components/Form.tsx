import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useWalletContext } from "../store/reducer";
import { getNodeRpcURL, getTxExplorerURL, getNodeWsURL } from "../lib/utils";
import { secretKey } from "../keys.config";
import { useSnackbar } from "notistack";

function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useWalletContext();

  //transfer function
  const transfer = () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      enqueueSnackbar(`Couldn\'t parse anount! :(, please check!`, {
        variant: "error",
        autoHideDuration: 2500,
      });
      return;
    }

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
        console.log(signature);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "isFetching", payload: false });
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
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Send
        </Button>
      ) : state.isFetching === true ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          disabled
        >
          Send
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Send
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Paste Destination Address
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Verify that the address is correct as funds sent to the wrong
            address might not be recovered.
          </DialogContentText>
          <TextField
            autoFocus
            id="outlined-full-width"
            label="Sol Devnet Address"
            required
            style={{ margin: 8 }}
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
            label="Amount"
            style={{ margin: 8 }}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={transfer} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
