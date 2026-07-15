import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    strict:true,
    strictQuery:true,
    collation:"book_data",
    toJSON:{getters:true},
    toObject:{getters:true}
});

export default mongoose.model("Book",bookSchema);