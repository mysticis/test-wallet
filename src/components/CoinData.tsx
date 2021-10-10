import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

export default function CoinData() {
  return (
    <Box
      sx={{
        //  bgcolor: "background.paper",
        minWidth: 300,
      }}
    >
      <Box sx={{ color: "text.secondary", fontFamily: "Quicksand" }}>
        Rank #7
      </Box>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Solana Icon"
          src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"
          sx={{ width: 24, height: 24 }}
        />
        <Typography style={{ fontFamily: "Quicksand", fontSize: 15 }}>
          Solana (SOL)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Box sx={{ color: "text.primary", fontSize: 20, fontWeight: "medium" }}>
          $154.82{" "}
        </Box>
        <TrendingDownIcon
          sx={{ color: "red", fontSize: 16, verticalAlign: "sub" }}
        />
        <Typography style={{ color: "red", fontSize: 16, marginTop: 3 }}>
          -2.9%
        </Typography>
      </Stack>
      <Stack direction="row" spacing={11}>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontWeight: "medium",
            fontSize: 15,
          }}
        >
          24Hr Range:
        </Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ color: "text.secondary", fontSize: 15 }}>
            Low: <span style={{ color: "#fff" }}>$152</span>
          </Box>
          <Box sx={{ color: "text.secondary", fontSize: 15 }}>
            High: <span style={{ color: "#fff" }}>$160</span>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={11.5}>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontWeight: "medium",
            fontSize: 15,
          }}
        >
          Market Cap:
        </Box>
        <Box sx={{ color: "text.primary", fontSize: 15 }}>$46,748,983,460</Box>
      </Stack>
      <Stack direction="row" spacing={4.5}>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontWeight: "medium",
            fontSize: 15,
          }}
        >
          24 Hour Trading Vol:
        </Box>
        <Box sx={{ color: "text.primary", fontSize: 15 }}>$1,448,472,337</Box>
      </Stack>
      <Stack direction="row" spacing={2.5}>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontWeight: "medium",
            fontSize: 15,
          }}
        >
          Fully Diluted Valuation:
        </Box>
        <Box sx={{ color: "text.primary", fontSize: 15 }}>$76,253,971,253</Box>
      </Stack>
    </Box>
  );
}
