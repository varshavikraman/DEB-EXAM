import { Router } from "express";
import { user } from "../Model/sample.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const loginRoute = Router();

loginRoute.post('/signup',async(req,res)=>{
    try {
        const {Name,Email,Password } = req.body;

        const User = await user.findOne({email:Email});
            if (User) {
                return res.status(400).json({ msg: "Email already exists" });
            }

        const newPassword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${newPassword}`);

        const newUser = new user({
            name: Name,
            email:Email,
            password: newPassword,
        });

        await newUser.save();
      
        res.status(201).json({msg:"Sucessfully created"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error"});
    }
        
})

loginRoute.post('/login',async(req,res)=>{
     try {
        const { Email, Password } = req.body;
        console.log(Password);    
        const result = await user.findOne({email:Email});
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Email not registered" })
        }
        const valid = await bcrypt.compare(Password, result.password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({Email:Email}, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authToken', token,
                    { httpOnly: true }
                )
                res.status(200).json({ msg: "Successfully logged in" })
            } else {
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" })
    }
})

loginRoute.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({msg:'Sucessfully Logged out'})
})

export {loginRoute}