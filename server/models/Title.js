
import mongoose from "mongoose";

const titleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    releaseYear: {
      type: Number,
      min: 1888,
      max: 2100,
    },
    overview: {
      type: String,
      trim: true,
      default: "",
    },
    genres: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

titleSchema.index({ name: 1, releaseYear: 1, type: 1 });

const Title = mongoose.model("Title", titleSchema);

export default Title;
