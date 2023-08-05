import { checker } from "../auth/authMiddleware";
import { createTask, listTask } from "./taskController";
import { validateCreateTask, verifyToken } from "./taskMiddleware";

export const taskRoutes = [
  {
    method: "post",
    path: "/create-task",
    handler: createTask,
    middleware: [verifyToken, validateCreateTask],
    public: true,
  },
  {
    method: "get",
    path: "/task-list",
    handler: listTask,
    middleware: [verifyToken, validateCreateTask],
    public: true,
  },
];
