import { Router } from "express";
import { Auth } from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";

/**
 * @class AuthRouter
 */
export default class UserRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/mark-as-complete", Auth, userController.markAsComplete);
    this.router.get(
      "/progress-percentage",
      Auth,
      userController.getProgressPercentage
    );

    this.router.get("/get-progress", Auth, userController.getProgress);
  };
}
