import { useEffect } from "react";
import Form from "./Form";
import { useWalletContext } from "../store/reducer";
import { getNodeRpcURL } from "../lib/utils";
import { Connection, PublicKey } from "@solana/web3.js";
import Recieve from "./Recieve";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BadgeAvatars from "./ConnectedIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { green } from "@mui/material/colors";
import "../App.css";
const DECIMAL_OFFSET = 1000000000;

export default function DetailedAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { state, dispatch } = useWalletContext();
  const publicKeyToDisplay = `${state.pubKey.slice(
    0,
    5
  )}...${state.pubKey.slice(-5)}`;

  //get balance
  useEffect(() => {
    //getBalance();
    const url = getNodeRpcURL();
    const connection = new Connection(url as string);

    const publicKey = new PublicKey(state.pubKey);
    connection
      .getBalance(publicKey)
      .then((balance) => {
        dispatch({ type: "getBalance", payload: balance / DECIMAL_OFFSET });
        toast.success("Successfully Connected!", {
          className: "success-toast",
          position: "top-right",
          autoClose: 7000,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        toast.error("Not Connected!", {
          position: "top-right",
          autoClose: 6000,
        });
        console.log(err);
      });
  }, [dispatch, state.pubKey]);
  // const getBalance = () => {
  //   const url = getNodeRpcURL();
  //   const connection = new Connection(url as string);

  //   const publicKey = new PublicKey(state.pubKey);
  //   connection
  //     .getBalance(publicKey)
  //     .then((balance) => {
  //       dispatch({ type: "getBalance", payload: balance / DECIMAL_OFFSET });
  //       toast.success("Successfully Connected!", {
  //         position: "bottom-center",
  //         autoClose: 7000,
  //         pauseOnHover: true,
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error("Not Connected!", {
  //         position: "top-right",
  //         autoClose: 6000,
  //       });
  //       console.log(err);
  //     });
  // };
  return (
    <div>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{ border: "2px solid grey", borderRadius: "10px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div>
            <BadgeAvatars />

            <Typography style={{ fontFamily: "Quicksand", fontSize: 20 }}>
              Main Account <br />({publicKeyToDisplay})
            </Typography>

            <Typography
              style={{ fontFamily: "Quicksand", fontSize: 20 }}
              color={green.A400}
            >
              {state.balance} SOL
            </Typography>
          </div>
          <Typography
            style={{
              fontFamily: "Quicksand",
              marginLeft: 20,
              fontSize: 18,
              color: green.A700,
            }}
          >
            Send/Recieve
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Form />

            <Recieve />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
