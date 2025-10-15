import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from "../Model/sample.js";


const userRouter = Router();

userRouter.post('/signup',async(req,res)=>{
    try {
        const { Name,UserName,Password,UserRole } = req.body;

        const User = await Users.findOne({ UserName });
            if (User) {
                return res.status(400).json({ msg: "Username already exists" });
            }

        const hashedPassword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${hashedPassword}`);

        const newUser = new Users({
            name:Name,
            userName:UserName,
            password:hashedPassword,
            userRole:UserRole
        });

        await newUser.save();
      
        res.status(201).json({msg:"Sucessfully created"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
        
})

userRouter.post('/login',async(req,res)=>{
     try {
        const { UserName, Password } = req.body;
        console.log(UserName);
        console.log(Password);    
        const result = await Users.findOne({userName:UserName});
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Username not registered" })
        }
        const valid = await bcrypt.compare(Password, result.password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName: UserName, UserRole: result.userRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authToken', token,
                    { httpOnly: true }
                )
                res.status(200).json({ msg: "Successfully loggedin" })
            } else {
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" })
    }
})

userRouter.get('/logout',(req,res) => {
  res.clearCookie('authToken');
  res.status(200).json({ msg: 'Successfully logged out' });
});

export {userRouter};