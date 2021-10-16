import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
export interface CoinData {
  market_cap_rank: number;
  market_data: MarketData;
}
interface FDV {
  usd: number;
}
interface MarketData {
  current_price: Price;
  fully_diluted_valuation: FDV;
  high_24h: High;
  low_24h: Low;
  market_cap: MarketCap;
  price_change_percentage_24h: number;
  total_volume: TotalVolume;
}

interface TotalVolume {
  usd: number;
}
interface MarketCap {
  usd: number;
}
interface High {
  usd: number;
}
interface Low {
  usd: number;
}
interface Price {
  usd: number;
}
const getCoinData = async (): Promise<CoinData> =>
  await (await fetch("https://api.coingecko.com/api/v3/coins/solana")).json();

export default function CoinDataFunc() {
  const { data, isLoading, error } = useQuery<CoinData>("Solana", getCoinData);

  if (isLoading) {
    console.log("loading data ...");
  }
  if (error) {
    toast.error("data fetching failed, retrying...", {
      position: "top-right",
      autoClose: 5000,
    });
  }

  console.log(data);
  let tradingVolume = data?.market_data.total_volume.usd;
  let percentage = data?.market_data.price_change_percentage_24h;
  let fdl = data?.market_data.fully_diluted_valuation.usd;
  let marketCap = data?.market_data.market_cap.usd;

  function formatToCurrency(amount: number | undefined) {
    if (amount === undefined) {
      return;
    }
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <Box
      sx={{
        //  bgcolor: "background.paper",
        minWidth: 300,
      }}
    >
      <Box sx={{ color: "text.secondary", fontFamily: "Quicksand" }}>
        Rank # {data?.market_cap_rank}
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
          ${data?.market_data.current_price.usd}
        </Box>
        <TrendingUpIcon
          sx={{ color: "green", fontSize: 16, verticalAlign: "sub" }}
        />
        <Typography style={{ color: "green", fontSize: 16, marginTop: 3 }}>
          {percentage?.toFixed(1)}%
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
            Low:{" "}
            <span style={{ color: "#fff" }}>
              ${data?.market_data.low_24h.usd}
            </span>
          </Box>
          <Box sx={{ color: "text.secondary", fontSize: 15 }}>
            High:{" "}
            <span style={{ color: "#fff" }}>
              ${data?.market_data.high_24h.usd}
            </span>
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
        <Box sx={{ color: "text.primary", fontSize: 15 }}>
          ${formatToCurrency(marketCap)}
        </Box>
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
        <Box sx={{ color: "text.primary", fontSize: 15 }}>
          ${formatToCurrency(tradingVolume)}
        </Box>
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
        <Box sx={{ color: "text.primary", fontSize: 15 }}>
          ${formatToCurrency(fdl)}
        </Box>
      </Stack>
    </Box>
  );
}
