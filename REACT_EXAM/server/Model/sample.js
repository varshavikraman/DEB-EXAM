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
    specialization: { type: String, required: true },
    consultingDays: [{ type: String, enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], required: true }],
    appointmentTime: { type: String, required: true },
    noOfSlot:{ type: Number, required: true },
})

const doctor = model('Doctors',doctorSchema);

const patientSchema = new Schema({
    patientName: { type: String, required: true },  
    age: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
});

const patient = model('Patients',patientSchema);

const appointmentSchema = new Schema({
    doctor: { type: Schema.Types.ObjectId, ref: "Doctors", required: true },
    patient: { type: Schema.Types.ObjectId, ref: "Patients", required: true },
    date: { type: Date, required: true },
    time:{ type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" }
});

const appointment = model("Appointment", appointmentSchema);

export {user,doctor,patient,appointment}