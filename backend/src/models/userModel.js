import { Schema } from "mongoose";
import { db } from "../config/connection.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    collection: "User",
    versionKey: false,
    timestamps: true,
  }
);

export default db.model("User", UserSchema);
