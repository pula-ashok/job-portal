import mongoose from 'mongoose'

//function to connect mongodb database

const connectDB=async()=>{
    mongoose.connection.on("connected",()=>console.log("Database connected successfully"))
    await mongoose.connect(process.env.MONGO_URI)
}

export default connectDB