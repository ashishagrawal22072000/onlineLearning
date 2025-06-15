import mongoose from "mongoose";
import config from "./config.js";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URI = `${config.MONGODB_URI}`;

export const db = mongoose.createConnection(MONGO_URI, connectOptions);

export default () => {
  db.on("connecting", () => {
    console.log("MongoDB connecting");
  });

  db.on("error", (error) => {
    console.log("MongoDB connection" + error);
    mongoose.disconnect();
  });

  db.on("connected", () => {
    console.log("MongoDB  connected");
  });

  db.on("disconnected", () => {
    console.log("Mongodb  disconnected");
  });
};
