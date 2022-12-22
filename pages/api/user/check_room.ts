import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      "id": string;
    };
}

type responseData = {
    "check" : boolean,
    "jumlah": number,
    "tipe": number,
    "level": number,
}


export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<responseData>
) {
  try{
    // console.log("request",req.body.id,req.body.id.length, "630afc84e8bff040ada8bb55");

    const client = await clientPromise
    const db = client.db("GameMath")
    const Room = db.collection("Room")

    let id : string = req.body.id;

    let data = await Room.findOne(
      { _id: new ObjectId(id) },
    )

    console.log("data", data);

    let resultCheck : boolean = false;

    let result = {
      "check": resultCheck,
      "jumlah": 0,
      "tipe": 0,
      "level": 0,
    }
    
    if(data){
      let dateNow = new Date();
      console.log("date now", Number(dateNow), data.dateExp);
      resultCheck =  data.dateExp > Number(dateNow)
    
      result = {
        "check": resultCheck,
        "jumlah": data.jumlah,
        "tipe": data.tipe,
        "level": data.level,
      }
    }

    console.log("result", result);

    res.status(200).send(result)
  
  }catch(err){
    console.log("error check room:",err)
    res.status(500)
  }
}
