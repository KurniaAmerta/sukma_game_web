import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      "username": string;
      "avatar": string;
    };
}

type responseData = {
  avatar: string
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<responseData>
) {
  try{
    const client = await clientPromise
    const db = client.db("GameMath")
    const Player = db.collection("Player")

    Player.updateOne(
      { username: req.body.username },
      { $set:
        {
          avatar: req.body.avatar,
        }
      }
    )

    res.status(200).json({ avatar: req.body.avatar })
  
  }catch(err){
    console.log("error change avatar:",err)
    res.status(500)
  }
}
