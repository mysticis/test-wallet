import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useWalletContext } from "../store/reducer";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "mdi-material-ui/ContentCopy";
import QrcodeIcon from "mdi-material-ui/Qrcode";
import QRCode from "qrcode.react";
//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: "baseline",
  },
}));

//Recieve component
export default function Recieve() {
  const [open, setOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const { state, dispatch } = useWalletContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //copy address function
  const textareaRef = useRef();

  const copyAddress = () => {
    navigator.clipboard.writeText(state.pubKey);
    setIsCopied(true);
    enqueueSnackbar(`Copied ${state.pubKey}`, {
      variant: "info",
      autoHideDuration: 2500,
    });
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Recieve
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Copy Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy the highlighted address to recieve SOL tokens
          </DialogContentText>
          <div className={classes.root}>
            <TextField
              inputRef={(ref) => (textareaRef.current = ref)}
              autoFocus
              value={state.pubKey}
              margin="normal"
              label="Recieving Address"
              type="text"
              fullWidth
              aria-readonly
              onFocus={(e) => e.currentTarget.select()}
            />
            <IconButton onClick={copyAddress}>
              <CopyIcon />
            </IconButton>
            <Qrcode value={state.pubKey} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={copyAddress} color="primary">
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useQrCodeStyles = makeStyles((theme) => ({
  qrcodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

function Qrcode({ value }: { value: string }) {
  const [showQrcode, setShowQrcode] = React.useState(false);
  const classes = useQrCodeStyles();

  return (
    <>
      <IconButton onClick={() => setShowQrcode(true)}>
        <QrcodeIcon />
      </IconButton>
      <Dialog open={showQrcode} onClose={() => setShowQrcode(false)}>
        <DialogContent className={classes.qrcodeContainer}>
          <QRCode value={value} size={256} includeMargin />
        </DialogContent>
      </Dialog>
    </>
  );
}
