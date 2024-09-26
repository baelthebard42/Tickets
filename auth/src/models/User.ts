import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String, // not related to TS. this is 'type' is related to mongoose
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
