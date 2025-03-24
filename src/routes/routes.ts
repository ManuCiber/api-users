import { Router } from "express";
import { CreateUser, DeleteUser, getUser, getUsers, UpdateUser } from "@/controllers/UserControllers";
import { CreateRoles, DeleteRoles, getRol, getRoles, UpdateRoles } from "@/controllers/RolesControllers";
import { verifyToken } from "middlewares/Auth";
import { loginUser, registerUser } from "@/controllersAuth/AuthControllers";

const router = Router();

export default () => {

    /*Registro Usuarios*/
    router.post("/register", registerUser);
    
    /*Login Usuarios*/
    router.post("/login", loginUser);
    /*Rutas Usuarios*/
    router.get("/mundo", (req, res)=>{
        res.send("Hola mundo. La API está funcionando correctamente");
    });
    
    /*Obtener Usuarios*/
    router.get("/users", verifyToken, getUsers);

    /*Obtener Usuario*/
    router.get("/users/:id", getUser);

    /*Crear Usuario*/
    router.post("/users", CreateUser);

    /*Actualizar Usuario*/
    router.put("/users/:id", UpdateUser);

    /*Borrar un Usuario*/
    router.delete("/users/:id", DeleteUser)

    /*Rutas Roles*/

        /*Obtener Rol*/
    router.get("/rol", getRoles);
        /*Obtener Rol*/
    router.get("/rol/:id", getRol);
    
    /*Crear Rol*/
    router.post("/rol", CreateRoles);
    
    /*Actualizar Rol*/
    router.put("/rol/:id",UpdateRoles);
    
    /*Borrar un Rol*/
    router.delete("/rol/:id", DeleteRoles);

    return router;
}