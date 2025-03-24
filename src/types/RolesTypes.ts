import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Roles extends Document{
    name: string;
    permissions: string[];
}

export interface IRolesRepository extends Repository<Roles>{}

export interface IRolesService{
    createRoles(rol:Roles):Promise<Roles>;
    findRoles(query:Query):Promise<Roles[]>;
    findRolesById(id:string):Promise<Roles|null>;
    updateRoles(id:string, Roles:Partial<Roles>):Promise<Roles|null>;
    deleteRoles(id:string):Promise<boolean>;
}