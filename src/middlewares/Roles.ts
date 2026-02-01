import {Request, Response, NextFunction } from "express";
import { RolesRepository } from "repositories/RolesRepository";
import { RolesService } from "services/RolesService";
import { IRolesRepository, IRolesService } from "types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

// export const CheckRoles = async (req: Request, res: Response, next: NextFunction) => {
    
//     try {
        
//         const roles = Array.isArray(req.body?.roles) ? req.body.roles : req.body?.roles ? [req.body.roles] : ["user"];
        
//         const wanted = roles.length? roles : ["user"];
//         const findRoles = await rolesService.findRoles({name: {$in:wanted}});
//         console.log("Roles Encontrados: ",findRoles);
//         console.log("Data", req.body);
//         console.log("Roles solicitados: ", wanted); 
        
//         // Si viene el rol, revisar en la base de datos que ese rol exista
//         req.body.roles = findRoles.map((x: any) => x._id);
//         // Si el rol no existe, retornamos un error, si existe se continua
//         if(findRoles.length === 0) {
//             res.status(400).json({message: "Role(s) not found"});
//         }
//         console.log("Roles asignados: ", req.body.roles);

//         next();

//     } catch (error) {
//         console.log("Error obtenido: ",error);
//         res.status(500).json(error);
//     }
// }

export const CheckRoles = async (req: Request, res: Response, next: NextFunction) => {
    // Si no viene el role, se crea un role "user" por default

    const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
    const role = Array.isArray(roles) && roles.length !== 0 ? roles: ["user"];
    console.log(role)
    console.log("Data: ", req.body)
    try {
        
        // Si viene el rol, revisar en la base de datos que ese rol exista

        const findRoles = await rolesService.findRoles({name: {$in:role}});
        //console.log(findRoles);
        // Si el rol no existe, retornamos un error, si existe se continua

        if(findRoles.length === 0) res.status(404).json({message: "Rol no encontrado."})

        req.body.roles = findRoles.map(x => x._id);
        //console.log("req.body.roles: ",req.body.roles);
        next();

    } catch (error) {
        console.log("Error obtenido: ",error);
        res.status(500).json(error);
    }
}
