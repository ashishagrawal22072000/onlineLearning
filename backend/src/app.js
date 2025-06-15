import express from "express";
import Middleware from "./middleware/middleware.js";
import Routes from "./router/routes.js";
import { config } from "dotenv";
import dbConnection from "./config/connection.js";

export class App {
  constructor() {
    config();
    this.app = express();
    dbConnection();
    Middleware.init(this);
    Routes.init(this);
  }
}

export default new App().app;
