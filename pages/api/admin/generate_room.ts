import type { NextApiRequest, NextApiResponse } from 'next'
import { now } from 'next-auth/client/_utils';
import clientPromise from "../../../lib/mongodb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      "username": string,
      "jumlah": number,
      "tipe": number,
      "level": number,
      "room": number,
      "dateRoom": number
    };
}

type responseData = {
  id: string[],
  date: number
}

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse<responseData>
) {
  try{
    const client = await clientPromise;
    const db = client.db("GameMath");
    const Room = db.collection("Room");

    let allId = [];

    let _dateExp = req.body.dateRoom;

    for(let i =0; i<req.body.room; i++){
      let result = await Room.insertOne( { 
          username: req.body.username,
          jumlah: req.body.jumlah,
          tipe: req.body.tipe,
          level: req.body.level,
          dateExp: _dateExp
      });

      allId.push(result.insertedId.toString());
    }

    res.status(200).json({ id: allId, date: _dateExp });
  
  }catch(err){
    console.log("error change avatar:",err)
    res.status(500)
  }
}
