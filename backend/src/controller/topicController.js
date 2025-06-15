import TopicService from "../services/topicService.js";
import { createTopicSchema } from "../validator/TopicValidator.js";

class TopicController {
  /**
  
   * @param  {express.Request} req
   * @param  {express.Response} res
   */

  async createTopic(req, res) {
    try {
      const validateSchema = createTopicSchema.validate(req.body);
      if (validateSchema.error) {
        return res.status(process.env.BAD_REQUEST).json({
          success: false,
          message: validateSchema.error.details[0].message,
        });
      }

      const response = await new TopicService().createTopic(
        validateSchema.value
      );
      return res.status(response.status).json({
        success: response.status == process.env.SUCCESS ? true : false,
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(process.env.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }

  async getTopicList(req, res) {
    try {
      const response = await new TopicService().getTopicList();
      return res.status(response.status).json({
        success: response.status == process.env.SUCCESS ? true : false,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(process.env.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}

export default new TopicController();
