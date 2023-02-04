import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";
import axios from "axios";

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
  const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
  let scopes = "user-read-private user-read-email";
  //let state = "aaaaaaaaaaaaaaaa";

  const result = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      redirect_uri: "http://localhost:3000",
      grant_type: "refresh_token",
      refresh_token:
        "AQCdJ6btorV7kavEjCiadaxe7nVlLhxcGc2av5qRV0FUIDsU1OszGy1oZWu07QP1OQ5TX5HlnWRUeEfYkxT_YM0iig9FTvOTsGVHY0dAPiN23xQr-ivTBG2xJTj7hKQzWRY",
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
  console.log("rels", result);
  const data = await result.data;
  res.status(200).json(data);
};
