import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
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
      trim: true,
    },
    role: {
      type: String,
      enum: ["entrepreneur", "investor", "admin"],
      default: "entrepreneur",
    },
    image: {
      type: [String],
      default: ["uploads/profile.png"],
    },
  },

  { timestamps: true }
);

const User = mongoose.model("NexusUser", Userschema);

export default User;
