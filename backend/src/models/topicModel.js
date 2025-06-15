import mongoose, { Schema } from "mongoose";
import { db } from "../config/connection.js";

const TopicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subtopics: [
      {
        name: {
          type: String,
          required: true,
        },
        leetcodeLink: {
          type: String,
          required: true,
        },
        youtubeLink: {
          type: String,
          required: true,
        },
        articleLink: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          enum: ["easy", "medium", "hard"],
          required: true,
        },
      },
    ],

    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    collection: "Topic",
    versionKey: false,
    timestamps: true,
  }
);

export default db.model("Topic", TopicSchema);
