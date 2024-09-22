import express from 'express'
import cors from 'cors';
import {config} from 'dotenv'
import { connectDB } from './config/db.js';
config();
import userRoutes from './routes/user.js'
import chatRoutes from './routes/chat.js'
import { errorHandler, notFound } from './middleware/errorMIddleware.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(express.static("./uploads"))

// Database 
connectDB()

// api routes 
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes)
    
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8084
app.listen(PORT,() => console.log(`Server is on PORT ${PORT}`))