import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type : String,
        require:true,
        maxlength : 8,
        get(){
            return "********"
        }
    }
},
{
    timestamps:true,
    strict:true,
    strictQuery:true,
    collation:"member_data",
    toJSON:{getters:true},
    toObject:{getters:true}
});

export default mongoose.model("Member",memberSchema);