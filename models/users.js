import mongoose from "mongoose";
const schema = mongoose.Schema;

const userschema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    }
})

const userModel=mongoose.model("user",userschema)

export default userModel