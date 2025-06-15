import express from "express";
import cors from "cors";

export default class Middleware {
  static init(server) {
    server.app.use(express.urlencoded({ extended: false }));
    server.app.use(express.json());

    var corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    server.app.use(cors(corsOptions));
    server.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, PATCH, PUT, DELETE, OPTIONS "
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With," +
          " Content-Type, Accept," +
          " Authorization," +
          " Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }
}
