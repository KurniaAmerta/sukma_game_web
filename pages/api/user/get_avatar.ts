import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      "username": string;
    };
}

type responseData = {
    avatar : string
}


export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<responseData>
) {
  try{
    const client = await clientPromise
    const db = client.db("GameMath")
    const Player = db.collection("Player")

    console.log("username", req.body);

    let data = await Player.findOne(
      { username: req.body.username },
    )

    console.log(data, req.body);

    res.status(200).send(data.avatar)
  
  }catch(err){
    console.log("error get avatar:",err)
    res.status(500)
  }
}
