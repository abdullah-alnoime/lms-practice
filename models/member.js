import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    currentBorrowsCount: {
      type: Number,
      default: 0,
      max: [5, "Member cannot borrow more than 5 books at the same time"],
    },
  },
  { timestamps: true },
);

export const Member = mongoose.model("Member", memberSchema);
