import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/dataSource";
import { Users } from "../db/models/users";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { error } from "console";
import {secret} from "../../secrets";


export const register = async (req: Request, res: Response) => {
  const user = await AppDataSource.getRepository(Users);
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };
    const result=await user.save(newUser);
    return result;
  } catch (err) {
    console.error(err);
    return error;
  }
};
export const login= async(req: Request, res:Response)=> {
  try {
    const { email, password } = req.body;
   const user = await AppDataSource.getRepository(Users);
    const userR = await user.findOne({ where: { email } });
    if (userR) {
      const isPasswordValid = await bcrypt.compare(password, userR.password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: userR.id, email: userR.email }, secret.secret!, { expiresIn: '1h' });
        return token;
      } else {
        console.error('Invalid password. Login failed.');
        return error;
      }
    } else {
      console.error('User not found. Login failed.');
      return error;
    }
  } catch (error) {
    return error
  }
}

export const listUser = async (req: Request, res: Response) => {
  try {
    const user = AppDataSource.getRepository(Users);
    const userR = await user.find();
    return userR;
  } catch (err) {
    console.error(err);
    return error;
  }
};
