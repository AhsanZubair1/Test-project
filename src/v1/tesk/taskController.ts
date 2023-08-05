import { error } from "console";
import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Task } from "../db/models/task";
export const createTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const task = AppDataSource.getRepository(Task);
    const taskR = await task.save({ name });
    return taskR;
  } catch (err) {
    console.error(err);
    return error;
  }
};

export const listTask = async (req: Request, res: Response) => {
  try {
    const task = AppDataSource.getRepository(Task);
    const taskR = await task.find();
    return taskR;
  } catch (err) {
    console.error(err);
    return error;
  }
};
