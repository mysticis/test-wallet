import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useWalletContext } from "../store/reducer";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "mdi-material-ui/ContentCopy";
import QrcodeIcon from "mdi-material-ui/Qrcode";
import { toast } from "react-toastify";
import { green } from "@mui/material/colors";
import QRCode from "qrcode.react";
import "react-toastify/dist/ReactToastify.css";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

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
  const { state } = useWalletContext();
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
    toast.success("Successfully copied address!", {
      position: "bottom-left",
      autoClose: 5000,
    });

    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<BusinessCenterIcon />}
        style={{ fontFamily: "Quicksand", color: green.A700 }}
      >
        Recieve
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Copy Address</DialogTitle>
        <DialogContent>
          <DialogContentText fontFamily={"Quicksand"}>
            Copy the highlighted address to recieve SOL tokens or click to scan
            barcode
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
          <Button onClick={handleClose} color="success" variant="outlined">
            Cancel
          </Button>
          <Button onClick={copyAddress} color="success" variant="outlined">
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
