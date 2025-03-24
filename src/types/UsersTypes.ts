import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Roles } from "./RolesTypes";

export interface User extends Document{
    name: string,
    username: string,
    email: string,
    password: string,
    comparepassword(password:string): Promise<boolean>;
    roles?: Roles[]; 
    permissions?: string[];
}

export interface IUserRepository extends Repository<User>{
    findOne(query:Query):Promise<User|null>;
}

export interface IUSerService{
    createUser(user:User):Promise<User>;
    findUsers(query?:Query):Promise<User[]>;
    findUsersById(id:string):Promise<User|null>;
    findUsersByEmail(email:string):Promise<User|null>;
    updateUser(id:string, user:Partial<User>):Promise<User|null>;
    deleteUser(id:string):Promise<boolean>;
}