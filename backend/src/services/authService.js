import userModel from "../models/userModel.js";
import CreateRepo from "../repo/createRepo.js";
import { Messages } from "../utils/messages.js";
import methods from "../utils/methods.js";
class AuthService {
  async checkuser(id, token) {
    try {
      const checkUser = await userModel.findOne({ _id: id });
      if (checkUser)
        return { status: process.env.SUCCESS, message: `Found successfully` };
      return {
        status: process.env.FORBIDDEN,
        message: Messages.USER_NOT_FOUND,
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async registerUser(data) {
    try {
      const { email, username, password } = data;
      const isUserExist = await userModel.findOne(
        {
          $or: [
            {
              username,
            },
            { email },
          ],
        },
        { _id: 1 }
      );

      if (isUserExist?.insertedId) {
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.ALREADY_EXIST,
        };
      }
      const bcryptPassword = await methods.encryptPassword(password);
      const saveUser = await new CreateRepo("User").create({
        ...data,
        password: bcryptPassword,
        create_at: new Date(),
        updated_at: new Date(),
      });
      const token = methods.newToken({ _id: saveUser.insertedId });

      if (!saveUser) throw new Error("Unable to create");

      return {
        status: process.env.SUCCESS,
        message: Messages.REGISTER_SUCCESS,
        data: {
          username,
          email,
          _id: saveUser.insertedId,
        },
        token,
      };
    } catch (err) {
      console.log(err);

      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async loginUser(data) {
    try {
      const { name, password } = data;
      const isUserExist = await userModel.findOne(
        {
          $or: [
            {
              username: name,
            },
            { email: name },
          ],
        },
        { _id: 1, username: 1, email: 1, password: 1 }
      );

      console.log(isUserExist);

      if (!isUserExist) {
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.USER_NOT_FOUND,
        };
      }
      const bcryptPassword = await methods.decryptPassword(
        isUserExist?.password,
        password
      );

      console.log(bcryptPassword, "ccccccccc");

      if (!bcryptPassword) {
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.ERROR_LOGIN,
        };
      }

      const token = methods.newToken({ _id: isUserExist?._id });
      return {
        status: process.env.SUCCESS,
        message: Messages.REGISTER_SUCCESS,
        data: {
          username: isUserExist?.username,
          email: isUserExist?.email,
          _id: isUserExist?._id,
        },
        token,
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default AuthService;
