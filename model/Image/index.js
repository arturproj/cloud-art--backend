import mongoose from "mongoose";
/**
 *
  dataurl : sdqdsdsqdsdsdsqd 
  fieldname: 'picture',
  originalname: '1602273160853.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '2d52e2298a75651f7b3d69d85a32d437',
  path: 'uploads/2d52e2298a75651f7b3d69d85a32d437',
  size: 10336

 */
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
