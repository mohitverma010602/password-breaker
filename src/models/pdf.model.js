import mongoose, { Schema } from "mongoose";

const pdfSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for querying
    },
    filename: {
      type: String,
      required: true,
      trim: true, // Trim whitespace from the beginning and end
    },
    originalFilename: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Indexes for frequently queried fields
pdfSchema.index({ owner: 1, processed: 1 });

export const PDF = mongoose.model("Pdf", pdfSchema);

// Fields: user (reference to the User model), filename, originalFilename, path, processed (boolean flag), actions (array of performed actions).
//     Methods: processActions(), download(), delete().
