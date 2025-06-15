import { config } from "dotenv";
config();
export default {
  development: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN,
    DB_CLIENT: process.env.DB_CLIENT,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}[process.env.NODE_ENV];
