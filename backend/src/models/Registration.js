import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
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

    ticketId: {
        type: String,
        unique: true,
    },

    qrCode: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Registered", "Cancelled", "Checked In"],
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations
registrationSchema.index(
  { user: 1, event: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);