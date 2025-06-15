import { Router } from "express";
import authController from "../controller/authController.js";

/**
 * @class AuthRouter
 */
export default class AuthRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/register", authController.register);
    this.router.post("/login", authController.login);
  };
}
