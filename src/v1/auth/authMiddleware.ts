import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Users } from "../db/models/users";

export const checker = (arr: string[], target: string[]) =>
  target.every((v) => arr.includes(v));

export const findUser = async (email: string) => {
  const user = AppDataSource.getRepository(Users);
  const userResult = await user.findOneBy({
    email,
  });
  return userResult;
};

export const validationRegistraion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredParams = ["email", "password"];
  const bodyKeys = Object.keys(req.body ?? {});
  if (checker(bodyKeys, requiredParams)) {
    if (await findUser(req.body.email)) {
      return res.status(200).json({ message: "User Already Registered" });
    }
    next();
  } else {
    return res.status(200).json({ message: "Required parameters Missing" });
  }
};

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredParams = ["email", "password"];
  const bodyKeys = Object.keys(req.body ?? {});
  const params = bodyKeys;
  if (checker(params, requiredParams)) {
    if (!(await findUser(req.body.email))) {
      return res.status(200).json({ message: "User not exist" });
    }
    next();
  } else {
    return res.status(200).json({ message: "Required parameters Missing" });
  }
};
