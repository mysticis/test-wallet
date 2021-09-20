import Typography from "@material-ui/core/Typography";
import { useWalletContext } from "../store/reducer";

const MyAccount = () => {
  //console.log(randomKeypair.secretKey);
  const { state, dispatch } = useWalletContext();
  const key = state.pubKey;
  console.log(key);
  const publicKeyToDisplay = `${state.pubKey.slice(
    0,
    5
  )}...${state.pubKey.slice(-5)}`;
  console.log(state);
  return (
    <div>
      <Typography variant="h6">Main Account ({publicKeyToDisplay})</Typography>
    </div>
  );
};

export default MyAccount;
