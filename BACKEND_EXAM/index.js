import express, {json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { doctorRoute } from './Route/doctorRoute.js';
import { patientRoute } from './Route/patient.js';
import { loginRoute } from './Route/loginRoute.js';
import { authenticate } from './Middleware/auth.js';
import adminCheck from './Middleware/adminCheck.js'


dotenv.config();

const app = express();

app.use(json());
app.use('/',loginRoute)
app.use('/',authenticate,adminCheck,patientRoute)
app.use('/',authenticate,adminCheck,doctorRoute)

mongoose.connect("mongodb://localhost:27017/HAS_System").then(()=>{
    console.log('MongoDB is connected successfully to HAS_System');
    
})
.catch((error)=>{
    console.log('MongoDB Connection error: ',error);
    
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listen to the port ${process.env.PORT}`);
    
})