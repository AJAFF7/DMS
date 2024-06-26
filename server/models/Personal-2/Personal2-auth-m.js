import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true },
  password: { type: String, required: true},
  // savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const  Pauth_Model2 = mongoose.model("p2-auths", UserSchema);
