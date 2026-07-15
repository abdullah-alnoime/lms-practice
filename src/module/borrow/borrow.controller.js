import { getBooksByMemberService,getMembersByBookService,createBorrowService } from "./borrow.service.js";

export const getBooksByMemberController = async (req,res)=>{

    try{

        const {memberId}=req.params;

        const books=await getBooksByMemberService(memberId);

        return res.status(200).json({
            success:true,
            count:books.length,
            data:books
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
export const getMembersByBookController = async (req,res)=>{

    try{

        const {bookId}=req.params;

        const members=await getMembersByBookService(bookId);

        return res.status(200).json({

            success:true,
            count:members.length,
            data:members

        });

    }catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};
export const createBorrowController = async (req, res) => {
    try {

        const borrow = await createBorrowService(req.body);

        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};