import mongoose from "mongoose";
import { Messages } from "../utils/messages.js";
import UpdateRepo from "../repo/updateRepo.js";
import UserProgress from "../models/userProgress.js";
import Topic from "../models/topicModel.js";

class UserService {
  async markAsComplete(data) {
    try {
      let { userId, topicId, subtopicId, checked } = data;

      let update;

      const subtopicObjectId = new mongoose.Types.ObjectId(subtopicId);
      const topicObjectId = new mongoose.Types.ObjectId(topicId);
      const userObjectId = new mongoose.Types.ObjectId(userId);

      if (checked) {
        update = {
          $addToSet: {
            "progress.$.completedSubtopics": subtopicObjectId,
          },
        };
      } else {
        update = {
          $pull: {
            "progress.$.completedSubtopics": subtopicObjectId,
          },
        };
      }

      const topic = await new UpdateRepo("UserProgress").updateOne(
        {
          userId: userObjectId,
          "progress.topicId": topicObjectId,
        },
        update
      );

      if (!topic.matchedCount && checked) {
        await new UpdateRepo("UserProgress").updateOne(
          {
            userId: userObjectId,
          },
          {
            $push: {
              progress: {
                topicId: topicObjectId,
                completedSubtopics: [subtopicObjectId],
              },
            },
          },
          { upsert: true }
        );
      }

      if (!topic) throw new Error("Unable to create");

      return {
        status: process.env.SUCCESS,
        message: Messages.TOPIC_CREATED,
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getProgressPercentage(userId) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const allSubTopics = await Topic.aggregate([
        { $unwind: "$subtopics" },
        {
          $project: {
            _id: "$subtopics._id",
            level: "$subtopics.level",
          },
        },
      ]);

      if (!Array.isArray(allSubTopics)) {
        throw new Error("Failed to fetch subtopics correctly");
      }

      const totalByLevel = allSubTopics.reduce((acc, sub) => {
        acc[sub.level] = (acc[sub.level] || 0) + 1;
        return acc;
      }, {});

      const userProgress = await UserProgress.aggregate([
        { $match: { userId: userObjectId } },
        { $unwind: "$progress" },
        { $unwind: "$progress.completedSubtopics" },
        {
          $group: {
            _id: null,
            completedSubtopics: {
              $addToSet: "$progress.completedSubtopics",
            },
          },
        },
      ]);

      const completeIds = (userProgress[0]?.completedSubtopics || []).map(
        (id) => id.toString()
      );

      const completedByLevel = allSubTopics.reduce((acc, sub) => {
        if (completeIds.includes(sub._id.toString())) {
          acc[sub.level] = (acc[sub.level] || 0) + 1;
        }
        return acc;
      }, {});

      const levels = ["easy", "medium", "hard"];
      const result = {};

      levels.forEach((level) => {
        const total = totalByLevel[level] || 0;
        const completed = completedByLevel[level] || 0;
        result[level] =
          total === 0 ? 0 : parseFloat(((completed / total) * 100).toFixed(2));
      });

      return {
        status: process.env.SUCCESS,
        message: "Progress calculated successfully",
        data: result || {
          easy: 0.0,
          medium: 0.0,
          hard: 0.0,
        },
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getProgress(userId) {
    try {
      const progress = await UserProgress.find({
        userId,
      });
      console.log(progress, "progress");

      return {
        status: process.env.SUCCESS,
        message: Messages.TOPIC_FETCHED,
        data: progress,
      };
    } catch (err) {
      console.log(err);

      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default UserService;
