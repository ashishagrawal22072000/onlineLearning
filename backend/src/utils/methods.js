import config from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class Methods {
  async encryptPassword(password) {
    return await bcrypt.hashSync(password, 10);
  }

  decryptPassword(password, newPassword) {
    return bcrypt.compare(newPassword, password);
  }

  newToken(data) {
    return jwt.sign(data, config.JWT_SECRET);
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      return false;
    }
  }
}

export default new Methods();
