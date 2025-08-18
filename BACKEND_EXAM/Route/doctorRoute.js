import { Router } from "express";
import { doctor } from "../Model/sample.js";

const doctorRoute = Router();

doctorRoute.post('/addDoctor', async (req,res) => {
    try {
        const {DoctorName,AppointmentDays,AppointmentTime} = req.body;
        const result = await doctor.findOne({doctorName:DoctorName})
        if (result) {
            res.status(400).json({msg:"This Doctor already exist"})
        } else {
            const newDoctor = new doctor({
                doctorName:DoctorName,
                appointmentDays:AppointmentDays,
                appointmentTime:AppointmentTime
            });
            await newDoctor.save();
            res.status(201).json({msg:'New Doctor Appointment is created'})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
});

export {doctorRoute}