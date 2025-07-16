import mongoose from "mongoose";
const schema = mongoose.Schema;

const productschema = new schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    }
})

const productModel=mongoose.model("products",productschema)

export default productModel