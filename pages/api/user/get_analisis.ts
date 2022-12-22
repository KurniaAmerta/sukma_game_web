import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      "username": String
    };
}

type responseData = {
    datas : string[]
}


export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<responseData>
) {
  try{
    const client = await clientPromise
    const db = client.db("GameMath")
    const Room = db.collection("Room")

    console.log(req.body.username)

    let data = await Room.find( 
      {'winner': req.body.username},
    );

    let arrayData = await data.toArray();

    res.status(200).send(arrayData)
  
  }catch(err){
    console.log("error get analisis:",err)
    res.status(500)
  }
}
