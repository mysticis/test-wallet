import React, { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Connect = () => {
  const [version, setVersion] = useState<string | undefined | number>(
    undefined
  );

  useEffect(() => {
    connection();
  }, []);
  const connection = () => {
    //const url = getNodeRpcURL();
    // Create a connection
    // Get the API version
    // and save it to the component's state
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
    <div>
      {version ? (
        <Alert severity="success">
          <Typography variant="subtitle1">
            Connected to Solana Devnet version: <strong>{version}</strong>
          </Typography>
        </Alert>
      ) : (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <Typography variant="h6">Not Connected to Solana!</Typography>
        </Alert>
      )}
    </div>
  );
};

export default Connect;
