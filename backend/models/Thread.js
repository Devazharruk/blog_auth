import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
});
// export this default
export default mongoose.model("Thread", UserSchema);
