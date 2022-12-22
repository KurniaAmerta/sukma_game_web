import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt';
import { MongoClient } from 'mongodb';

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      username: string;
      email: string;
      password: string
    };
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const saltRounds = 10;
        const newPassword = await hash(req.body.password, saltRounds)

        console.log("new password", newPassword);
        //Connect to DB
        const client = await MongoClient.connect(
            "mongodb+srv://gadjah:gadjah4635@cluster0.6zd5i.mongodb.net/test"
        );

        const users = client.db("GameMath").collection('Player');

        const result = await users.findOne({
            username: req.body.username,
        });

        if(!result){
            await users.insertOne( { 
                username: req.body.username, 
                email: req.body.email,
                password: newPassword 
            });
            res.send("User created");
        }else{
            res.send("Username already exist");
        }
    }catch(err){
        console.log("register err", err);
        res.send(err);
    }

    
}

