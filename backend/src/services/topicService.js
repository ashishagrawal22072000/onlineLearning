import topicModel from "../models/topicModel.js";
import CreateRepo from "../repo/createRepo.js";
import { Messages } from "../utils/messages.js";
class TopicService {
  async createTopic(data) {
    try {
      const topic = new topicModel(data);
      const saveTopic = await topic.save();
      if (!saveTopic) throw new Error("Unable to create");

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

  async getTopicList() {
    try {
      const topic = await topicModel.find();
      console.log(topic);

      return {
        status: process.env.SUCCESS,
        message: Messages.TOPIC_FETCHED,
        data: topic || [],
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default TopicService;
