import { Router } from "express";
import { appointment } from "../Model/sample.js";
import { doctor } from "../Model/sample.js";
import { patient } from "../Model/sample.js";

const appointmentRoute = Router();

appointmentRoute.post("/appointmentSchedule", async (req, res) => {
  try {
    const { DoctorName, PatientName, AppointmentDate, AppointmentTime, Status } = req.body;

    const doctorAccount = await doctor.findOne({ doctorName: DoctorName });
    const patientAccount = await patient.findOne({ patientName: PatientName });

    if (!doctorAccount || !patientAccount) {
      return res.status(404).json({ msg: "Doctor or Patient not found" });
    }

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date(AppointmentDate);
    const dayOfWeek = days[dateObj.getDay()]; 

    if (!doctorAccount.consultingDays.includes(dayOfWeek)) {
      return res.status(400).json({ msg: "Doctor is not available on this day" });
    }

    if (!doctorAccount.appointmentTime.includes(AppointmentTime)) {
      return res.status(400).json({ msg: "Doctor is not available at this time" });
    }

    const existingAppointments = await appointment.countDocuments({
      doctor: doctorAccount._id,
      date: AppointmentDate,
      time: AppointmentTime,
      status: "Scheduled"
    });

    if (existingAppointments >= doctorAccount.noOfSlot) {
      return res.status(400).json({ msg: "No slots available for this time" });
    }

    const newAppointment = new appointment({
      doctor: doctorAccount._id,
      patient: patientAccount._id,
      date: AppointmentDate,
      time: AppointmentTime,
      status: Status || "Scheduled"
    });

    await newAppointment.save();
    res.status(201).json({ msg: "Appointment scheduled", appointment: newAppointment });

  } catch (error) {
    console.error("Error scheduling appointment:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});


appointmentRoute.get('/viewPatientScheduleAppointment', async (req,res) => {
    try {
      const key = req.query.pNo;
      console.log("Patient Id:",key);

      const patientAccount = await patient.findOne({ phone: key });
      if (!patientAccount) return res.status(404).json({ msg:"Patient not found" });

      const appointments = await appointment.find({ patient: patientAccount._id })
      .populate("doctor")
      .populate("patient");

      res.status(200).json({ msg:"Appointments fetched", appointments });
        
    } catch (error) {
        console.log('Error:',error);
        res.status(500).json({msg:"Internal server error"})
    }
});

appointmentRoute.get('/viewDoctorScheduleAppointment', async (req,res) => {
  try {
    const key = req.query.dName;
    console.log("Doctor Name:",key);

    const doctorAccount = await doctor.findOne({ doctorName: key });
    if (!doctorAccount) return res.status(404).json({ msg:"Doctor not found" });

    const appointments = await appointment.find({ doctor: doctorAccount._id })
      .populate("doctor")
      .populate("patient");

    res.status(200).json({ msg:"Appointments fetched", appointments });
  } catch (error) {
    console.log('Error:',error);
    res.status(500).json({msg:"Internal server error"});
  }
});

appointmentRoute.get('/viewAllAppointment', async (req, res) => {
  try {
    const appointments = await appointment.find()
      .populate("doctor")
      .populate("patient");

    console.log("Fetched Appointments:", appointments);

    if (!appointments.length) {
      return res.status(404).json({ msg: "No Appointments found" });
    }

    res.status(200).json({ msg: "Appointments fetched", appointments });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

appointmentRoute.get('/viewAppointment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleAppointment = await appointment.findById(id)
      .populate("doctor")
      .populate("patient");

    if (!singleAppointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    res.status(200).json({ msg: "Appointment fetched", appointment: singleAppointment });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


appointmentRoute.patch('/updatePatientAppointment/:id', async (req,res) => {
    try {
        const { status } = req.body;
        const result = await appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new:true }
        );

        if (!result) return res.status(404).json({ msg:"Appointment not found" });
        res.status(200).json({ msg:"Appointment updated", appointment: result });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ msg:"Internal server error" });
    }
});

export {appointmentRoute}