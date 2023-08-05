import express, {
  Request,
  response,
  Response,
  Router,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import { secret } from "./secrets";
import authRouter from "./v1/auth";
import { AppDataSource } from "./v1/db/dataSource";
import taskRouter from "./v1/tesk";
import cors from "cors";

const app = express();
const v1: Router = express.Router();
const allowedOrigins = ["*"];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb" }));
app.use("/v1", v1);
v1.use("/auth", authRouter);
v1.use("/task", taskRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  res.status(404).json({ error: error.message });
});
app.use((err: Error, request: Request, res: Response) => {
  res.status(500).json({ error: "Internal Server Error" });
});

AppDataSource.initialize().then(() => {
  app.listen(secret.port, () => {
    console.log(`port is running on ${secret.port}`);
  });
});
