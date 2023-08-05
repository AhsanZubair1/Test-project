import { Request,Response,NextFunction} from "express";
import { checker,findUser } from "../auth/authMiddleware"
import jwt from 'jsonwebtoken';
import {secret} from "../../secrets";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.header('Authorization'))
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, secret.secret!) as { id: number; email: string };
    Object.assign(req, { user: decoded });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

 export const validateCreateTask=async (req:Request,res:Response,next:NextFunction)=>{
    const requiredParams = ['name']
    const bodyKeys = Object.keys(req.body ?? {});
    console.log(requiredParams,bodyKeys)
    if(checker(bodyKeys,requiredParams)){
      next()
    }
    else{
      return res.status(401).json({ error: 'missing required params'})
    }


  }