import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, default: null, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "student",
    enum: ["student", "mentor"]
  },
  token: { type: String },
});

export default mongoose.model("user", userSchema);
