import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "employer"],
    },
    profile: {
      bio: { type: String },
      skils: { type: String },
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profileImage: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
