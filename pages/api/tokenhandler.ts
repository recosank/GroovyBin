import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //console.log("chk chk", req.body.data);

  const cookieInst = Cookies(req, res);
  cookieInst.set("accs_tkn", req.body.data, {
    path: "/",
  });
  res.status(200).json(req.body.data);
};
