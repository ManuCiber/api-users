import { Request, Response } from "express";
import { RolesRepository } from "repositories/RolesRepository";
import { RolesService } from "services/RolesService";
import { IRolesRepository, Roles } from "types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: RolesService = new RolesService(rolesRepository);


export const getRoles = async(req:Request, res:Response)=>{
    try {
        const rol = await rolesService.findRoles();
        res.json(rol);   
    } catch (error) {
        console.log(error);
        res.status(500).json(error);   
    }
}

export const getRol =  async(req:Request, res:Response)=>{
    try {
        const rol = await rolesService.findRolesById(req.params.id);
        res.json(rol);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const CreateRoles = async(req:Request, res:Response)=>{
    try {
        const newRol:Roles = req.body;
        const result = await rolesService.createRoles(newRol);            
        res.json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
}

export const UpdateRoles =  async(req:Request, res:Response)=>{            
    try {
        const rol = await rolesService.updateRoles(req.params.id, req.body);
        res.json(rol)    
    } catch (error) {
        console.log(error);
        res.send(500).json({message: "Error al actualizar el rol"});
    }
    
}

export const DeleteRoles = async(req:Request, res:Response)=>{
    try {
        const rol= await rolesService.deleteRoles(req.params.id);
        res.json(rol);
    } catch (error) {
        console.log(error);
    }
}