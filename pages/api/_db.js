import mongoose from "mongoose";

void mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    registerDate: {
      type: String,
      required: true,
    },
    lastLoginDate: {
      type: String,
      required: false,
    }
  },
  { collection: "users" },
);

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
