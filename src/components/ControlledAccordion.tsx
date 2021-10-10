import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WalletAccordion from "./WalletAccordion";
import CoinData from "./CoinData";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div
      style={{
        marginTop: 50,
        boxShadow: "21px 18px 38px 0px rgba(0,0,0,0.73)",
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ border: "2px solid grey", borderRadius: "10px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              fontFamily: "Quicksand",
              fontSize: 18,
            }}
          >
            Market Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CoinData />
        </AccordionDetails>
      </Accordion>
      <WalletAccordion />
    </div>
  );
}
