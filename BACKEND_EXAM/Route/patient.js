import { Router } from "express";
import { patient } from "../Model/sample.js";

const patientRoute = Router();

patientRoute.post('/addPatient', async (req,res) => {
    try {
        const {PatientName,PatientId, DoctorName,AppointmentDay,AppointmentTime} = req.body;
        const result = await patient.findOne({patientId:PatientId})
        if (result) {
            res.status(400).json({msg:"This Patient already exist"})
        } else {
            const newPatient = new patient({
                patientName:PatientName,
                patientId:PatientId,
                doctorName:DoctorName,
                appointmentDay:AppointmentDay,
                appointmentTime:AppointmentTime
            });
            await newPatient.save();
            res.status(201).json({msg:'New Patient Appointment is created'})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    } 
})

patientRoute.get('/viewPatientScheduleAppointment', async (req,res) => {
    try {
        const key = req.query.pId;
        console.log("Patient Id:",key);

        const result = await patient.findOne({patientId:key})
        if (result) {
            res.status(200).json({msg:'The Patient detail fetched successfully', data:result})
        } else {
            res.status(404).json({msg:'the Patient details is not found'})
        }
        
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
});

patientRoute.get('/viewDoctorScheduleAppointment', async (req,res) => {
    try {
        const key = req.query.dName;
        console.log("Doctor Name:",key);

        const result = await patient.findOne({doctorName:key});
        if (result) {
            res.status(200).json({msg:'The Doctor Appointment fetched successfully', data:result})
        } else {
            res.status(404).json({msg:'The Doctor has no Appointment'})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
})

patientRoute.patch('/updatePatientAppointment', async (req,res) => {
    try {
        const {PatientId, DoctorName,AppointmentDay,AppointmentTime} = req.body;
        const result = await patient.findOne({patientId:PatientId})
        if (result) {
            result.patientId=PatientId,
            result.doctorName=DoctorName,
            result.appointmentDay=AppointmentDay
            result.appointmentTime=AppointmentTime

            await result.save()
            res.status(200).json({msg:'The Patient Appointment updated successfully', data:result})
        } else {
            res.status(404).json({msg:'Patient not Found'})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
})

patientRoute.delete('/deletePatientAppointment', async (req,res) => {
    try {
        const {PatientId} = req.body;
        const result = await patient.findOne({patientId:PatientId})
        if (result) {
            await patient.findOneAndDelete({patientId:PatientId})
            res.status(200).json({msg:'The Patient Appointment deleted successfully'})
        } else {
            res.status(404).json({msg:'Patient not Found'})
        } 
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
    
    
})
export {patientRoute}