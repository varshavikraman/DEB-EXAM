import express, {json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/userRoute.js';
import { adminRoute } from './routes/adminRoute.js';
import { authenticate } from './Middleware/auth.js';
import adminCheck from './Middleware/adminCheck.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3131",
    credentials:true
}))

app.use(json());
app.use('/',userRouter);
app.use('/',authenticate,adminCheck,adminRoute)

mongoose.connect("mongodb://localhost:27017/Student_Management").then(() => {
        console.log("MongoDB successfully connected");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});
