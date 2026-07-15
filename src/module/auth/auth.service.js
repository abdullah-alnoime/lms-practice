import MemberModel from "../../model/user.model.js";


// CREATE MEMBER
export const createMemberService = async (data) => {
    return await MemberModel.create(data);
};


// GET ALL MEMBERS
export const getAllMembersService = async () => {
    return await MemberModel.find();
};


// GET MEMBER BY ID
export const getMemberByIdService = async (id) => {
    return await MemberModel.findById(id);
};