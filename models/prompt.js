import mongoose, { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Required"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt Necessary"],
  },
  tag: {
    type: String,
    required: [true, "Tag Necessary"],
  },
});

export const Prompts = models.Prompts || model("Prompts", PromptSchema);
