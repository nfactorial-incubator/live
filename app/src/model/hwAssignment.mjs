import mongoose from "mongoose";

const hwAssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export default mongoose.model("hwAssignment", hwAssignmentSchema);
