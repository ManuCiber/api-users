import { UserRepository } from "repositories/UserRepository";
import { UserService } from "services/UserService";
import { IUserRepository, User } from "types/UsersTypes";
import jwt from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";

interface LoginData {
  email: string;
  password: string;
}

const userRepository: IUserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export const registerUser:RequestHandler = async (req: Request, res:Response) => {
    try {
      const { email }: LoginData = req.body;
      const userExists = await userService.findUsersByEmail(email);
      
      if (!userExists) {
          const newUser = await userService.createUser(req.body);
          res.status(201).json(newUser);      
      } else {
          res.status(400).json({ message: "User already exists" });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {  
    try {
      const {email, password} : LoginData = req.body;
      const user = await userService.findUsersByEmail(email);
      const jwtSecret = process.env.JWT_SECRET as string;
      
      if(!user || !(await user.comparepassword(password))){
        res.status(401).json({message:"Usuario o contraseña inválido"});
        return;
      }

      const token = jwt.sign({
        id: user?._id,
        email: user?.email,
        usuario: user?.username
      },jwtSecret, {expiresIn: "1h"});

      res.status(200).json({user, token});
      console.log(token);

    } catch (error) {
      res.status(500).json({message: "Internal Error server"});
      console.log(error);
    }
  };