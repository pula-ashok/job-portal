import express from 'express';
import cors from 'cors'
import "dotenv/config";
import connectDB from './config/db.js';

//initialize express app
const app = express();

//connect to database
await connectDB()

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => res.send("Hello World!"));

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));