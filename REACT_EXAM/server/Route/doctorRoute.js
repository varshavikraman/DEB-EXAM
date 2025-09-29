import { Router } from "express";
import { doctor } from "../Model/sample.js";

const doctorRoute = Router();

doctorRoute.post('/addDoctor', async (req,res) => {
    try {
        const {DoctorName,Specialization,ConsultingDays,AppointmentTime,NoOfSlot} = req.body;
        const result = await doctor.findOne({doctorName:DoctorName})
        if (result) {
            res.status(400).json({msg:"This Doctor already exist"})
        } else {
            const newDoctor = new doctor({
                doctorName:DoctorName,
                specialization:Specialization,
                consultingDays:ConsultingDays,
                appointmentTime:AppointmentTime,
                noOfSlot:NoOfSlot
            });
            await newDoctor.save();
            res.status(201).json({msg:'New Doctor created',doctor: newDoctor})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
});

doctorRoute.delete('/deleteDoctorAccount', async (req,res) => {
    try {
        const {DoctorName} = req.body;
        const result = await doctor.findOne({doctorName:DoctorName})
        if (result) {
            await doctor.findOneAndDelete({doctorName:DoctorName})
            res.status(200).json({msg:"The Doctor's Account deleted successfully"})
        } else {
            res.status(404).json({msg:'Doctor not Found'})
        } 
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
    
    
})

export {doctorRoute}