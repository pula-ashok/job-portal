import "./config/instrument.js"
import express from 'express';
import cors from 'cors'
import "dotenv/config";
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node"
import { webhooks } from './controllers/webhooks.js';

//initialize express app
const app = express();

//connect to database
await connectDB()

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => res.send("Hello World!"));
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post("/webhooks",webhooks)
  

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app)

//listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));