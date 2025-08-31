import mongoose from "mongoose";

const EntrepreneurSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NexusUser", // link to your User model
    },
    name: {
      type: String,
      required: true,
    },
    startup: {
      type: String,
      required: true,
    },
    pitchSummary: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Entrepreneur = mongoose.model("Entrepreneur", EntrepreneurSchema);

export default Entrepreneur;
