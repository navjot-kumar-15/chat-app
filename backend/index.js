import express from 'express'
import cors from 'cors';
import {config} from 'dotenv'
import { connectDB } from './config/db.js';
config();
import userRoutes from './routes/user.js'


const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Database 
connectDB()

// api routes 
app.use("/api/user",userRoutes)


const PORT = process.env.PORT || 8084
app.listen(PORT,() => console.log(`Server is on PORT ${PORT}`))