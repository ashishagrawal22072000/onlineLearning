import UserService from "../services/userService.js";
import { markAsCompleteSchema } from "../validator/TopicValidator.js";

class UserController {
  /**
  
   * @param  {express.Request} req
   * @param  {express.Response} res
   */

  async markAsComplete(req, res) {
    try {
      const validateSchema = markAsCompleteSchema.validate(req.body);
      if (validateSchema.error) {
        return res.status(process.env.BAD_REQUEST).json({
          success: false,
          message: validateSchema.error.details[0].message,
        });
      }

      const response = await new UserService().markAsComplete({
        ...validateSchema.value,
        userId: req.loginUser._id,
      });
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

  async getProgressPercentage(req, res) {
    try {
      const response = await new UserService().getProgressPercentage(
        req.loginUser._id
      );
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

  async getProgress(req, res) {
    try {
      const response = await new UserService().getProgress(req.loginUser._id);
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

export default new UserController();
