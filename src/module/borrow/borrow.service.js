import BorrowModel from "../../model/borrow.model.js";

export const getBooksByMemberService = async (memberId) => {

    return await BorrowModel.find({
        member:memberId
    })
    .populate("book")
    .populate("member");

};
export const getMembersByBookService = async (bookId)=>{

    return await BorrowModel.find({
        book:bookId,
        returnDate:null
    })
    .populate("member")
    .populate("book");

};
// CREATE BORROW
export const createBorrowService = async (data) => {
    return await BorrowModel.create(data);
};