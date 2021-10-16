import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { grey } from "@mui/material/colors";

export default function NavBar() {
  const [version, setVersion] = useState<string | undefined | number>(
    undefined
  );

  useEffect(() => {
    connection();
  }, []);
  const connection = () => {
    const url = process.env.REACT_APP_CONNECTION_URL as string;
    const connection = new Connection(url);
    connection
      .getVersion()
      .then((version) => setVersion(version["solana-core"]))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: grey[300] }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar
              alt="Solana Icon"
              src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"
            />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily={"Quicksand"}
            fontWeight={500}
          >
            Test Wallet*
          </Typography>
          <Typography fontFamily={"Quicksand"} fontSize={"20"}>
            Devnet Version {version}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
