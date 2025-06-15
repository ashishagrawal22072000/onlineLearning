import { Router } from "express";
import topicController from "../controller/topicController.js";
import { Auth } from "../middleware/authMiddleware.js";

/**
 * @class AuthRouter
 */
export default class TopicRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/create", Auth, topicController.createTopic);
    this.router.get("/get-all", Auth, topicController.getTopicList);
  };
}
