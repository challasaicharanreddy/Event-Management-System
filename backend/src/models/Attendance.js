import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    checkedInAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceSchema);