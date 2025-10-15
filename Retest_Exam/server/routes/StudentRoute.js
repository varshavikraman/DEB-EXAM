import { Router } from "express";
import { Student } from "../Model/sample.js";

const studentRoute = Router();

studentRoute.get('/getStudent', async(req, res) => {
    try {
        const key = req.query.rNo;
        console.log("RollNo:", key);

        const result = await Student.findOne({rollNo:key});

        if (!result) {
        return res.status(404).json({ msg: "Student Not Found" });
      }

      res.status(200).json({
        studentName: result.studentName,
        department: result.department,
        rollNo: result.rollNo,
        age: result.age,
        address: result.address,
      });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
        
    }
});