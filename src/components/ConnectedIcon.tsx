import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Connection } from "@solana/web3.js";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: 'ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }));

export default function BadgeAvatars() {
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
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: version ? "#44b700" : "#f5424b",
      color: version ? "#44b700" : "#f5424b",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Solana Icon"
          src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"
        />
      </StyledBadge>
    </>
  );
}
