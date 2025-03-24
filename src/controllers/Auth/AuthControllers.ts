import { UserRepository } from "repositories/UserRepository";
import { UserService } from "services/UserService";
import { IUserRepository, User } from "types/UsersTypes";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";



const userRepository: IUserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export const registerUser = async (req: Request, res:Response) => {
    try {
      
      const { email }: User = req.body;
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
  const jwtSecret = process.env.JWT_SECRET as string;

    try {
      const { email, password }: User = req.body;
      const user = await userService.findUsersByEmail(email);
      
      if(!user) return res.status(400).json({message: "Usuario o Contraseña Inválida"});

      const comparePass = await user.comparepassword(password);
      if(!comparePass) return res.status(400).json({message: "Usuario o Contraseña Inválida"})

      const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
      },jwtSecret,{expiresIn:"1h"});

      console.log(token);

      res.status(200).json({user});

    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json(error);
    }
  };