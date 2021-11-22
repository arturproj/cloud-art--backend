import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({
  dataset: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
});

const Picture = mongoose.model("picture", pictureSchema);

export default Picture;
