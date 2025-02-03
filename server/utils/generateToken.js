import jwt from "jsonwebtoken";

const generateToken=(id)=>{
 const token =  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
//  console.log("ashok",token)
 return token;
}

export default generateToken;