import { Schema } from "mongoose";
import { db } from "../config/connection.js";

const UserProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    progress: [
      {
        topicId: {
          type: Schema.Types.ObjectId,
          ref: "Topic",
        },

        completedSubtopics: [
          {
            type: Schema.Types.ObjectId,
          },
        ],
      },
    ],
  },
  {
    collection: "UserProgress",
    versionKey: false,
    timestamps: true,
  }
);

export default db.model("UserProgress", UserProgressSchema);
