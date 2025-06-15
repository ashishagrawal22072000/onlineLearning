import express from "express";
import AuthRouter from "./authRouter.js";
import TopicRouter from "./topicRouter.js";
import UserRouter from "./userRouter.js";
export default class Routes {
  /**
   * @param  {Routes}
   * @returns void
   */
  static init(server) {
    const router = express.Router();

    server.app.use("/", router);

    /**
     * Entry point
     */

    server.app.get("/", (_, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<div><p><h3>InMedico Server is working fine at : ${process.env.PORT}</h3><p></div>`
      );
    });

    // Auth Router
    server.app.use("/api/v1/auth", new AuthRouter().router);
    server.app.use("/api/v1/topic", new TopicRouter().router);
    server.app.use("/api/v1/user", new UserRouter().router);
    /**
     * 404 if url not found
     */
    server.app.all("*", (_, res) => {
      res.status(process.env.NOT_FOUND).json({
        success: false,
        message: `API not found.`,
      });
    });

    // Static folder
  }
}
