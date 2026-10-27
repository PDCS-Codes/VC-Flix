
import mongoose from "mongoose";

const watchlistEntrySchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Title",
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posterUrl: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same title from appearing twice in the shared watchlist.
watchlistEntrySchema.index({ title: 1 }, { unique: true });

const WatchlistEntry = mongoose.model(
  "WatchlistEntry",
  watchlistEntrySchema
);

export default WatchlistEntry;
