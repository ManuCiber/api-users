import { UserRepository } from "repositories/UserRepository";
import { UserService } from "services/UserService";
import { IUserRepository, User } from "types/UsersTypes";
import {Request, Response} from "express";

const userRepository: IUserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);


export const getUsers = async(req:Request, res:Response)=>{
    try {
        const users = await userService.findUsers();
        res.json(users);        
    } catch (error) {
        res.send(error);
        res.status(404).json({message: "No se encontraron usuarios"});
    }
}

export const getUser = async(req:Request, res:Response) => {
    try {
        const user = await userService.findUsersById(req.params.id);
        res.json(user);
    } catch (error) {
        res.send(error);
        res.status(404).json({message: "Usuario no encontrado"});
    }
};

export const CreateUser = async(req:Request, res:Response)=>{
    try {
        const newUser:User = req.body;
        const result = await userService.createUser(newUser);
        res.json(result);
    } catch (error) {
        res.send(error);
        res.status(500).json({message: "No se pudo crear el usuario"});   
    }
}

export const UpdateUser = async(req:Request, res:Response)=>{
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user)
    } catch (error) {
        res.send(error);
        res.status(500).json({message: "No se pudo actualizar el usuario"});
    }
}

export const DeleteUser = async(req:Request, res:Response)=>{
    try {
        const user= await userService.deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        res.send(error);
        res.status(500).json({message: "No se pudo borrar el usuario"});
    }
    
}