import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
{
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },

    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },

    borrowDate:{
        type:Date,
        default:Date.now
    },

    returnDate:{
        type:Date,
        default:null
    }
},
{
    timestamps:true,
    strict:true,
    strictQuery:true,
    collation:"borrow_data",
    toJSON:{getters:true},
    toObject:{getters:true}
});

export default mongoose.model("Borrow",borrowSchema);