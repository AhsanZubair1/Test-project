import express, { Router, Response, Request, NextFunction } from "express";
import { taskRoutes } from "./taskRoutes";

const taskRouter: Router = express.Router();
type MyFunctionType = (req: Request, res: Response) => Promise<any>;

taskRoutes.forEach((route) => {
  const { path, middleware, method, handler } = route;

  (taskRouter as any)[method](
    path,
    middleware,
    (req: Request, res: Response, next: NextFunction) => {
      const result = (handler as MyFunctionType)(req, res);
      try {
        if (result instanceof Promise) {
          result.then((val) => {
            val !== null &&
              val !== undefined &&
              res.status(200).json({ data: val });
          });
        } else {
          res.status(200).json({ data: result });
        }
      } catch (err) {
        next(err);
      }
    }
  );
});

export default taskRouter;
