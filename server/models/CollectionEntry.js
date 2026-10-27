
import mongoose from "mongoose";

const collectionEntrySchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["watched", "watching", "plan_to_watch", "dropped"],
      default: "watched",
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    posterUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// A user can have only one personal entry for each title.
collectionEntrySchema.index({ user: 1, title: 1 }, { unique: true });

const CollectionEntry = mongoose.model(
  "CollectionEntry",
  collectionEntrySchema
);

export default CollectionEntry;
