import { Schema } from "mongoose";
import { model } from "mongoose";


const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const user = model('Users',userSchema);

const doctorSchema = new Schema({
    doctorName:{type:String,required:true,unique:true},
    appointmentDays:{type:String,required:true},
    appointmentTime:{type:String,required:true}
})

const doctor = model('Doctors',doctorSchema);

const patientSchema = new Schema({
    patientName:{type:String,required:true,unique:true},
    patientId:{type:String,required:true,unique:true},
    doctorName:{type:String,required:true},
    appointmentDay:{type:String,required:true},
    appointmentTime:{type:String,required:true}
})

const patient = model('Patients',patientSchema);

export {doctor,patient,user}