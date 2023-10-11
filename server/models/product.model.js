import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  category: {
    type: String,
    required: "Category is required",
  },
  //salt: String,
});
/*
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    // this.salt = this.makeSalt();
    this.hashed_password = password // this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);
*/
export default mongoose.model("product", ProductSchema);
