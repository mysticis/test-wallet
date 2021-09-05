import Typography from "@material-ui/core/Typography";
import { useWalletContext } from "../store/reducer";

const MyAccount = () => {
  //console.log(randomKeypair.secretKey);
  const { state, dispatch } = useWalletContext();
  console.log(state);
  return (
    <div>
      <Typography variant="h6">
        Address<div>{state.pubKey}</div>
      </Typography>
    </div>
  );
};

export default MyAccount;
