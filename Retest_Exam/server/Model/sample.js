import { Schema} from "mongoose";
import {model}  from "mongoose"

const userSchema = new Schema({
    name :{type:String,required:true,},
    userName: {type:String,required:true,unique:true},
    password:{type:String,required:true,}, 
    userRole : {type :String,enum:['admin','user'],required:true}
});
const Users = model('users',userSchema)


const  studentSchema =  new Schema ({
    studentName :{type:String,required:true,},
    department: {type: String ,required:true },
    rollNo : {type:String,required:true,unique:true},
    age :  {type:Number,required:true,},
    address : {type :String , required: true},

});
const Student = model('students', studentSchema)



export {Users,Student};