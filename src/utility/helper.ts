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
      redirect_uri: "https://groovy-bin-recosank.vercel.app",
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

export const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
