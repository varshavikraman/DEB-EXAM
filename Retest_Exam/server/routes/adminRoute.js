import { Router } from "express";
import { Student } from "../Model/sample.js";

const adminRoute = Router();

adminRoute.post('/addStudent',async(req,res)=>{
    try {
        const { StudentName,Department,RollNo,Age,Address } = req.body;

        const result = await Student.findOne({rollNo:RollNo});

            if(result){
                res.status(400).json({msg :`This Roll No. ${RollNo} already exist`});
            } else {
                const newStudent = new Student({
                    studentName : StudentName,
                    department : Department,
                    rollNo : RollNo,
                    age : Age,
                    address : Address,
                }); 

                await newStudent.save();

                res.status(201).json({msg: `${StudentName} added successfully`, data:newStudent })
            }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }    
});

adminRoute.put('/updateStudent', async(req,res)=>{
    try {
        const { StudentName,Department,RollNo,Age,Address } = req.body;

        const result = await Student.findOne({rollNo:RollNo});
        if (result) {
            result.studentName = StudentName,
            result.department = Department,
            result.rollNo = RollNo,
            result.age = Age,
            result.address = Address
            
            await result.save();
            res.status(201).json({msg:'Student details successfully updated'})
        } else {
            res.status(404).json({msg:'Student not found' })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


adminRoute.delete('/deleteStudent', async(req,res)=>{
    try {
        const { RollNo } = req.body;
        const result = await Student.findOne({rollNo:RollNo});

        if (result) {
            await Student.findOneAndDelete({rollNo:RollNo});
            res.status(200).json({msg:`Student with Roll No.${RollNo} deleted Successfully`});
        } else {
            res.status(404).json({msg:'Student not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
});

export {adminRoute}