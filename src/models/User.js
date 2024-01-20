import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass || pass.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = 10;
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});
const User = mongoose.models?.User || model("User", UserSchema);

export default User;
