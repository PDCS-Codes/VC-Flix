
import mongoose from "mongoose";

const shuffleSessionSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "revealed", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    selections: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        title: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Title",
          required: true,
        },
        revealed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    revealAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

shuffleSessionSchema.index({ createdBy: 1, status: 1 });

const ShuffleSession = mongoose.model(
  "ShuffleSession",
  shuffleSessionSchema
);

export default ShuffleSession;
