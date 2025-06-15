import AuthService from "../services/authService.js";
import { Messages } from "../utils/messages.js";
import methods from "../utils/methods.js";

/**
 * @param req
 * @param res
 * @param next
 * @returns success and error will return
 */
export const Auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(process.env.UNAUTHORISED)
      .json({ success: false, message: Messages.AUTH_ERROR });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    var decoded = await methods.verifyToken(token);
    if (decoded) {
      req.loginUser = decoded;
      req.loginUser["jwt_token"] = token;
      console.log(req.loginUser._id, token, "token");
      let checkUser = await new AuthService().checkuser(
        req.loginUser._id,
        token
      );
      console.log(checkUser);
      if (checkUser.status !== process.env.SUCCESS)
        return res.status(checkUser.status).json({
          success: false,
          message: checkUser.message,
        });
      next();
    } else
      return res.status(process.env.UNAUTHORISED).json({
        success: false,
        message: Messages.JWT_ERROR,
      });
  } catch (err) {
    res
      .status(process.env.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};
