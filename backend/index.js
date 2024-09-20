import express from 'express'
import cors from 'cors';
import {config} from 'dotenv'
import { connectDB } from './config/db.js';
config();


const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Database 
connectDB()


const PORT = process.env.PORT || 8084
app.listen(PORT,() => console.log(`Server is on PORT ${PORT}`))