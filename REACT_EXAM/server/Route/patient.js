import { Router } from "express";
import { patient } from "../Model/sample.js";

const patientRoute = Router();

patientRoute.post('/addPatient', async (req,res) => {
    try {
        const {PatientName,Age,Phone} = req.body;
        const result = await patient.findOne({phone:Phone})
        if (result) {
            res.status(400).json({msg:"This Patient already exist"})
        } else {
            const newPatient = new patient({
    patientName: PatientName,
    age: Age,
    phone: Phone
});

            await newPatient.save();
            res.status(201).json({msg:'New Patient Appointment is created'})
        }
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    } 
})

patientRoute.delete('/deletePatientAccount', async (req,res) => {
    try {
        const {PatientName} = req.body;
        const result = await patient.findOne({patientName:PatientName})
        if (result) {
            await patient.findOneAndDelete({patientName:PatientName})
            res.status(200).json({msg:'The Patient Account deleted successfully'})
        } else {
            res.status(404).json({msg:'Patient not Found'})
        } 
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
})
export {patientRoute}