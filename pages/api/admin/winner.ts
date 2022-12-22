import type { NextApiRequest, NextApiResponse } from 'next'
import { now } from 'next-auth/client/_utils';
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        "id": string,
        "username": string,
    };
}

type responseData = {
  id: string,
  winner: string[]
}

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse<responseData>
) {
  try{
    const client = await clientPromise;
    const db = client.db("GameMath");
    const Room = await db.collection("Room");

    let usernameWinner = JSON.parse(req.body.username);
    usernameWinner = usernameWinner.Items;

    Room.updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set:
          {
            winner: usernameWinner,
            dateExp: Number(new Date())
          }
        }
      )

    res.status(200).json({ id: req.body.id, winner: usernameWinner });
  
  }catch(err){
    console.log("error change avatar:",err)
    res.status(500)
  }
}
