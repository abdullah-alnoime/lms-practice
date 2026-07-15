import { Member } from "../models/member.js";

export const registerMember = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const newMember = new Member({
      name,
      email,
    });
    await newMember.save();
    return res.status(201).json({
      message: "Member registered successfully",
      member: newMember,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "A member with this email already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
