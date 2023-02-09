import axios from "axios";
import { localhost, vercel } from "../routes/urls";

const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
let scopes = "user-read-private user-read-email";

export const getToken = async (code: string | string[]) => {
  const result = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      code: `${code}`,
      redirect_uri: vercel,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );

  const data = await result.data;

  return data;
};
