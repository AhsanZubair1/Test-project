
import { verifyToken } from "../tesk/taskMiddleware"
import { listUser, login, register } from "./authController"
import { loginValidation, validationRegistraion } from "./authMiddleware"
export const authRoutes= [
  {method:'post', path:'/register',middleware:[validationRegistraion],handler:register,public:true},
  {method:"post",path:"/login",middleware:[loginValidation],handler:login,public:true},
  {method:"get",path:"/users",middleware:[verifyToken],handler:listUser,public:true},
]