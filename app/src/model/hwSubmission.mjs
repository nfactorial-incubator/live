import mongoose from "mongoose";

const hwSubmissionSchema = new mongoose.Schema({
  description: {
    type: String,
    default: null
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  grade: {
    type: String,
    default: "plastic",
    enum: ["plastic", "bronze", "silver", "gold", "platinum"]
  }
});

export default mongoose.model("hwSubmission", hwSubmissionSchema);
