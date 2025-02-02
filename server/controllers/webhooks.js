import {Webhook} from 'svix'
import User from '../models/User.js';

//api controller function to manage clerk user with database

export const webhooks=async(req,res)=>{
    try {
        // create a svix instance with cleark webhook secret 
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        //verify headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        })
        //getting data from the request body
        const {data,type}=req.body;
        //switch case for different events
        switch(type){
            case "user.created":
                //create user in database
                const userData={
                    _id:data.id,
                    email:data.email_addresse[0].email,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                    resume:"",
                }
                await User.create(userData)
                res.json({})
                break;
            case "user.updated":
                //update user in database
                const userDataUpdated={
                    email:data.email_addresse[0].email,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userUpdatedData)
                res.json({})
                break;
            case "user.deleted":
                //delete user in database
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            default :
                break
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Webhook error"})
    }
}