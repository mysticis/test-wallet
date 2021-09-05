import React, { useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import LayoutTextFields from "./FormControl";
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");
  //const textBoxOne = React.useRef<HTMLInputElement>(null);
  //const textBoxTwo = React.useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Send Lamports
      </Button>
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
            placeholder="Placeholder"
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
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
