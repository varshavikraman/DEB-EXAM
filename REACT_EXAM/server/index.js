import express, {json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { doctorRoute } from './Route/doctorRoute.js';
import { patientRoute } from './Route/patient.js';
import { loginRoute } from './Route/loginRoute.js';
import { appointmentRoute } from './Route/appointmentRoutes.js';


dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3030",
    credentials:true
}))

app.use(json());
app.use('/',loginRoute)
app.use('/',patientRoute)
app.use('/',doctorRoute)
app.use('/',appointmentRoute)

mongoose.connect("mongodb://localhost:27017/HAS_System").then(()=>{
    console.log('MongoDB is connected successfully to HAS_System');
    
})
.catch((error)=>{
    console.log('MongoDB Connection error: ',error);
    
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listen to the port ${process.env.PORT}`);
    
})