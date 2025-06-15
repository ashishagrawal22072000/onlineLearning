import AuthService from "../services/authService.js";
import { loginSchema, registerSchema } from "../validator/authValidator.js";

class AuthController {
  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   */

  async register(req, res) {
    try {
      const validateSchema = registerSchema.validate(req.body);
      if (validateSchema.error) {
        return res.status(process.env.BAD_REQUEST).json({
          success: false,
          message: validateSchema.error.details[0].message,
        });
      }

      const response = await new AuthService().registerUser(
        validateSchema.value
      );
      return res.status(response.status).json({
        success: response.status == process.env.SUCCESS ? true : false,
        message: response.message,
        data: response.data,
        token: response.token,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(process.env.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
  async login(req, res) {
    try {
      const validateSchema = loginSchema.validate(req.body);
      if (validateSchema.error) {
        return res.status(process.env.BAD_REQUEST).json({
          success: false,
          message: validateSchema.error.details[0].message,
        });
      }

      const response = await new AuthService().loginUser(validateSchema.value);
      return res.status(response.status).json({
        success: response.status == process.env.SUCCESS ? true : false,
        message: response.message,
        data: response.data,
        token: response.token,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(process.env.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();
