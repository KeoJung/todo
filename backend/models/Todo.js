import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", todoSchema);
