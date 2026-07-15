import {
    createMemberService,
    getAllMembersService,
    getMemberByIdService
} from "./auth.service.js";


// CREATE MEMBER
export const createMemberController = async (req, res) => {
    try {

        const member = await createMemberService(req.body);

        return res.status(201).json(member);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};


// GET ALL MEMBERS
export const getAllMembersController = async (req, res) => {

    const members = await getAllMembersService();

    return res.status(200).json(members);

};


// GET MEMBER BY ID
export const getMemberByIdController = async (req, res) => {

    const member = await getMemberByIdService(req.params.id);

    return res.status(200).json(member);

};