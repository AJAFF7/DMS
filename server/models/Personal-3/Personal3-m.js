import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  pername: { type: String, required: true, unique: true }, // Assuming pername should be unique
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  dameg: { type: Number, required: true },

  timestamp: {
    type: Date,
    default: Date.now, // or new Date() for a UTC timestamp
  },
});

export const DataModelPersonal3 = mongoose.model("personal3", UserSchema);
