const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seminar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seminar",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    qrCode: {
      type: String,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Registration", registrationSchema);
